import { CurrencyAmount } from "@uniswap/sdk-core";
import { BigNumber, ethers } from "ethers";
import { getCoingeckoPricesFromTokenDetails } from "../../helpers/common";
import { getReadContract } from "../../shared/chains";
import { ContractStaticInfo, ProtocolInfo } from "../../shared/types/protocols";
import { ProtocolTypes } from "../../shared/protocols/constants";
import { tokenTypesData } from "../../shared/constants/token";
import { fetchUsdValue, multiplyBN, toFixedTrunc6Digits } from "../../helpers/math";
import qiFarms from "../../shared/protocols/qidao/qidao-farms";
import { CoingeckoResponse, TokenDetails } from "../../shared/types/tokens";

export interface IProtocolAdapter {
    getFarmInfo: (address: string) => Promise<ProtocolInfo>;
}

const qiAdapter: IProtocolAdapter = {
    getFarmInfo: async (address: string) => {
        let farms: ProtocolInfo = {
            type: ProtocolTypes.Farms,
            items: []
        };

        await Promise.all(
            qiFarms.map(async (contractStaticInfo: ContractStaticInfo) => {

                const contract = getReadContract(contractStaticInfo.chainId, contractStaticInfo.address, JSON.stringify(contractStaticInfo.abi));
                if (contract && contractStaticInfo.params) {
                    const coingeckoResponse = await getCoingeckoPricesFromTokenDetails([
                        contractStaticInfo.tokensDetailRewards[0]
                    ]);

                    const farmingDeposit: BigNumber = await contract.deposited(contractStaticInfo.params[0], address);
                    const farmingDepositCA = CurrencyAmount.fromRawAmount(contractStaticInfo.tokenDetail.token, farmingDeposit.toString());
                    const farmingDepositExact = farmingDepositCA.toExact();

                    const farmingRewards = await contract.pending(contractStaticInfo.params[0], address);
                    const farmingRewardsCA = CurrencyAmount.fromRawAmount(contractStaticInfo.tokensDetailRewards[0].token, farmingRewards);
                    const farmingRewardsExact = farmingRewardsCA.toExact();

                    let farmingRewardsUsdValue = 0;
                    let farmingRewardsPrice = 0;
                    if (farmingDeposit.gt(0)) {
                        ({ price: farmingRewardsPrice, usdValue: farmingRewardsUsdValue } = fetchUsdValue(
                            coingeckoResponse,
                            contractStaticInfo.tokensDetailRewards[0],
                            farmingRewards
                        ));
                    }

                    if (farmingDeposit.gt(0)) {
                        farms.items?.push({
                            balance: [{
                                amount: farmingDepositExact,
                                tokenDetail: contractStaticInfo.tokenDetail,
                                price: 0,
                                usdValue: 0
                            }],
                            pool: [contractStaticInfo.tokenDetail],
                            rewards: [{
                                amount: farmingRewardsExact,
                                tokenDetail: contractStaticInfo.tokensDetailRewards[0],
                                price: farmingRewardsPrice,
                                usdValue: farmingRewardsUsdValue,
                            }],
                            usdValue: 0,
                            address: contractStaticInfo.address
                        });
                    }
                }
            })
        );
        return farms;
    }
}
export default qiAdapter;
