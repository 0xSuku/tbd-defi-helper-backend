import { CurrencyAmount } from "@uniswap/sdk-core";
import { BigNumber } from "ethers";
import { getCoingeckoPricesFromTokenDetails } from "../../helpers/common";
import { ProtocolInfo } from "../../shared/types/protocols";
import { ProtocolTypes } from "../../shared/protocols/constants";
import { fetchUsdValue } from "../../helpers/math";
import { addProtocolItemToCurrentDeposits, getBalanceFromLP } from "../helpers";
import { SolidlyGaugeV2DepositInfoBase } from "../../shared/protocols/entities/solidly";
import solidlyDeposits from "../../shared/protocols/solidly-forks/thena/thena-farms";
import { TokenAmount } from "../../shared/types/tokens";
import { CacheContainer } from 'node-ts-cache'
import { MemoryStorage } from 'node-ts-cache-storage-memory'

const depositsCache = new CacheContainer(new MemoryStorage());
export interface IProtocolAdapter {
    fetchDepositInfo: (address: string) => Promise<ProtocolInfo[]>;
}

const solidlyAdapter: IProtocolAdapter = {
    fetchDepositInfo: async (address: string, forceRefresh?: boolean) => {
        const depositsCached = await depositsCache.getItem<ProtocolInfo[]>(address);
        if (depositsCached && !forceRefresh) {
            return depositsCached;
        }
        let deposits: ProtocolInfo[] = [];

        await Promise.all(
            solidlyDeposits.map(async (depositInfo: SolidlyGaugeV2DepositInfoBase) => {
                if (depositInfo.contract) {

                    const coingeckoResponse = await getCoingeckoPricesFromTokenDetails([
                        depositInfo.tokenDetailsRewards,
                        ...(
                            depositInfo.poolInfo ?
                                depositInfo.poolInfo.tokens :
                                []
                        )
                    ]);

                    const farmingDeposit: BigNumber = await depositInfo.getDepositAmount(address);
                    const farmingDepositCA = CurrencyAmount.fromRawAmount(depositInfo.tokenDetails.token, farmingDeposit.toString());
                    const farmingDepositExact = farmingDepositCA.toExact();

                    let balanceTokens: TokenAmount[] = [];
                    if (depositInfo.poolInfo) {
                        balanceTokens = await getBalanceFromLP(depositInfo, farmingDepositCA, coingeckoResponse);
                    } else {
                        let stakedUsdValue = 0;
                        let stakedPrice = 0;

                        ({ price: stakedPrice, usdValue: stakedUsdValue } = fetchUsdValue(
                            coingeckoResponse,
                            depositInfo.tokenDetails,
                            farmingDeposit
                        ));

                        balanceTokens = [{
                            amount: farmingDepositExact,
                            tokenDetail: depositInfo.tokenDetails,
                            price: stakedPrice,
                            usdValue: stakedUsdValue
                        }];
                    }

                    const farmingRewards: BigNumber = await depositInfo.getRewardAmount(address);
                    const farmingRewardsCA = CurrencyAmount.fromRawAmount(depositInfo.tokenDetailsRewards.token, farmingRewards.toString());
                    const farmingRewardsExact = farmingRewardsCA.toExact();

                    if (farmingDeposit.gt(0) || farmingRewards.gt(0)) {
                        let farmingRewardsUsdValue = 0;
                        let farmingRewardsPrice = 0;
                        ({ price: farmingRewardsPrice, usdValue: farmingRewardsUsdValue } = fetchUsdValue(
                            coingeckoResponse,
                            depositInfo.tokenDetailsRewards,
                            farmingRewards
                        ));

                        const balanceTokensUsdValue = balanceTokens.reduce((accum, bt) => accum + bt.usdValue, 0);
                        let totalUsdValue = balanceTokensUsdValue + farmingRewardsUsdValue;
                        addProtocolItemToCurrentDeposits(deposits, ProtocolTypes.Farms, {
                            balance: balanceTokens,
                            pool: [depositInfo.tokenDetails],
                            rewards: [{
                                amount: farmingRewardsExact,
                                tokenDetail: depositInfo.tokenDetailsRewards,
                                price: farmingRewardsPrice,
                                usdValue: farmingRewardsUsdValue,
                            }],
                            usdValue: totalUsdValue,
                            address: depositInfo.address,
                            name: depositInfo.name,
                            depositId: depositInfo.defiLlamaId || ''
                        });
                    }
                }
            })
        );
        const sortedDeposits = deposits.map(depositInfo => {
            depositInfo.deposits = depositInfo.deposits?.sort((a, b) => b.usdValue - a.usdValue);
            return depositInfo;
        });

        await depositsCache.setItem(address, sortedDeposits, { ttl: 86400 });
        return sortedDeposits;
    }
}
export default solidlyAdapter;
