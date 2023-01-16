import { CurrencyAmount } from "@uniswap/sdk-core";
import { BigNumber, ethers } from "ethers";
import { getCoingeckoPricesFromTokenDetails } from "../../helpers/common";
import { getReadContract } from "../../shared/chains";
import { ProtocolInfo } from "../../shared/types/protocols";
import { ProtocolTypes } from "../../shared/protocols/constants";
import { fetchUsdValue } from "../../helpers/math";
import { QiDaoFarmVaultDepositInfo } from "../../shared/protocols/entities/qidao";
import qiFarms from "../../shared/protocols/qidao/qidao-farms";

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
            qiFarms.map(async (farmVaultDepositInfo: QiDaoFarmVaultDepositInfo) => {

                const contract = getReadContract(farmVaultDepositInfo.chainId, farmVaultDepositInfo.address, JSON.stringify(farmVaultDepositInfo.abi));
                if (contract) {
                    if (!farmVaultDepositInfo.vaultId) throw new Error('Should have the fees address');
                    
                    const coingeckoResponse = await getCoingeckoPricesFromTokenDetails([
                        farmVaultDepositInfo.tokenDetailsRewards
                    ]);

                    const farmingDeposit: BigNumber = await contract.deposited(farmVaultDepositInfo.vaultId, address);
                    const farmingDepositCA = CurrencyAmount.fromRawAmount(farmVaultDepositInfo.tokenDetails.token, farmingDeposit.toString());
                    const farmingDepositExact = farmingDepositCA.toExact();

                    const farmingRewards = await contract.pending(farmVaultDepositInfo.vaultId, address);
                    const farmingRewardsCA = CurrencyAmount.fromRawAmount(farmVaultDepositInfo.tokenDetailsRewards.token, farmingRewards);
                    const farmingRewardsExact = farmingRewardsCA.toExact();

                    let farmingRewardsUsdValue = 0;
                    let farmingRewardsPrice = 0;
                    if (farmingDeposit.gt(0)) {
                        ({ price: farmingRewardsPrice, usdValue: farmingRewardsUsdValue } = fetchUsdValue(
                            coingeckoResponse,
                            farmVaultDepositInfo.tokenDetailsRewards,
                            farmingRewards
                        ));
                    }

                    if (farmingDeposit.gt(0)) {
                        farms.items?.push({
                            balance: [{
                                amount: farmingDepositExact,
                                tokenDetail: farmVaultDepositInfo.tokenDetails,
                                price: 0,
                                usdValue: 0
                            }],
                            pool: [farmVaultDepositInfo.tokenDetails],
                            rewards: [{
                                amount: farmingRewardsExact,
                                tokenDetail: farmVaultDepositInfo.tokenDetailsRewards,
                                price: farmingRewardsPrice,
                                usdValue: farmingRewardsUsdValue,
                            }],
                            usdValue: 0,
                            address: farmVaultDepositInfo.address
                        });
                    }
                }
            })
        );
        return farms;
    }
}
export default qiAdapter;
