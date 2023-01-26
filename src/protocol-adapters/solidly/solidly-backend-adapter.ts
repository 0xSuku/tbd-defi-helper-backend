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

export interface IProtocolAdapter {
    fetchDepositInfo: (address: string) => Promise<ProtocolInfo[]>;
}

const solidlyAdapter: IProtocolAdapter = {
    fetchDepositInfo: async (address: string) => {
        let deposits: ProtocolInfo[] = [];

        await Promise.all(
            solidlyDeposits.map(async (farmVaultDepositInfo: SolidlyGaugeV2DepositInfoBase) => {
                if (farmVaultDepositInfo.contract) {

                    const coingeckoResponse = await getCoingeckoPricesFromTokenDetails([
                        // farmVaultDepositInfo.tokenDetailsRewards,
                        ...(
                            farmVaultDepositInfo.poolInfo ?
                                farmVaultDepositInfo.poolInfo.tokens :
                                []
                        )
                    ]);

                    const farmingDeposit: BigNumber = await farmVaultDepositInfo.getDepositAmount(address);
                    const farmingDepositCA = CurrencyAmount.fromRawAmount(farmVaultDepositInfo.tokenDetails.token, farmingDeposit.toString());
                    const farmingDepositExact = farmingDepositCA.toExact();

                    let balanceTokens: TokenAmount[] = [];
                    if (farmVaultDepositInfo.poolInfo) {
                        balanceTokens = await getBalanceFromLP(farmVaultDepositInfo, farmingDepositCA, coingeckoResponse);
                    } else {
                        let stakedUsdValue = 0;
                        let stakedPrice = 0;

                        ({ price: stakedPrice, usdValue: stakedUsdValue } = fetchUsdValue(
                            coingeckoResponse,
                            farmVaultDepositInfo.tokenDetails,
                            farmingDeposit
                        ));

                        balanceTokens = [{
                            amount: farmingDepositExact,
                            tokenDetail: farmVaultDepositInfo.tokenDetails,
                            price: stakedPrice,
                            usdValue: stakedUsdValue
                        }];
                    }

                    const farmingRewards: BigNumber = await farmVaultDepositInfo.getRewardAmount(address);
                    const farmingRewardsCA = CurrencyAmount.fromRawAmount(farmVaultDepositInfo.tokenDetailsRewards.token, farmingRewards.toString());
                    const farmingRewardsExact = farmingRewardsCA.toExact();

                    if (farmingDeposit.gt(0) || farmingRewards.gt(0)) {
                        let farmingRewardsUsdValue = 0;
                        let farmingRewardsPrice = 0;
                        // ({ price: farmingRewardsPrice, usdValue: farmingRewardsUsdValue } = fetchUsdValue(
                        //     coingeckoResponse,
                        //     farmVaultDepositInfo.tokenDetailsRewards,
                        //     farmingRewards
                        // ));

                        const balanceTokensUsdValue = balanceTokens.reduce((accum, bt) => accum + bt.usdValue, 0);
                        let totalUsdValue = balanceTokensUsdValue + farmingRewardsUsdValue;
                        addProtocolItemToCurrentDeposits(deposits, ProtocolTypes.Farms, {
                            balance: balanceTokens,
                            pool: [farmVaultDepositInfo.tokenDetails],
                            rewards: [{
                                amount: farmingRewardsExact,
                                tokenDetail: farmVaultDepositInfo.tokenDetailsRewards,
                                price: farmingRewardsPrice,
                                usdValue: farmingRewardsUsdValue,
                            }],
                            usdValue: totalUsdValue,
                            address: farmVaultDepositInfo.address,
                            name: farmVaultDepositInfo.name
                        });
                    }
                }
            })
        );
        return deposits.map(depositInfo => {
            depositInfo.items = depositInfo.items?.sort((a, b) => b.usdValue - a.usdValue);
            return depositInfo;
        });
    }
}
export default solidlyAdapter;
