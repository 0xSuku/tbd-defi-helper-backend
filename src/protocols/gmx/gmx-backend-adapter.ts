import { CurrencyAmount, Token } from "@uniswap/sdk-core";
import { getReadContract } from "../../shared/chains";
import { ContractStaticInfo, ProtocolInfo } from "../../shared/types/protocols";
import { ProtocolTypes } from "../../shared/protocols/constants";
import { getCoingeckoPricesFromTokenDetails } from "../../helpers/common";
import { fetchUsdValue } from "../../helpers/math";

export interface IProtocolAdapter {
    getStakingInfo: (address: string, gmxFarms: ContractStaticInfo[]) => Promise<ProtocolInfo>;
}

const gmxAdapter: IProtocolAdapter = {
    getStakingInfo: async (address: string, gmxFarms: ContractStaticInfo[]) => {

        let deposits: ProtocolInfo = {
            type: ProtocolTypes.Farms,
            items: []
        };

        await Promise.all(
            gmxFarms.map(async (contractStaticInfo: ContractStaticInfo) => {

                const stakeContract = getReadContract(contractStaticInfo.chainId, contractStaticInfo.address, JSON.stringify(contractStaticInfo.abi));
                if (stakeContract) {
                    switch (contractStaticInfo.type) {
                        case ProtocolTypes.Staking:
                            try {
                                if (!contractStaticInfo.extraAddresses) throw new Error('Should have the fees address');
                                if (!contractStaticInfo.extraABIs) throw new Error('Should have the fees ABIs');

                                const coingeckoResponse = await getCoingeckoPricesFromTokenDetails([
                                    contractStaticInfo.tokensDetailRewards[0],
                                    contractStaticInfo.tokensDetailRewards[1]
                                ]);

                                const staked = await stakeContract.stakedAmounts(address);
                                const stakedCA = CurrencyAmount.fromRawAmount(contractStaticInfo.tokenDetail.token, staked);
                                const stakedExact = stakedCA.toExact();

                                const stakingRewards = await stakeContract.claimable(address);
                                const stakingRewardsCA = CurrencyAmount.fromRawAmount(contractStaticInfo.tokensDetailRewards[0].token, stakingRewards);
                                const stakingRewardsExact = stakingRewardsCA.toExact();

                                let stakingRewardsUsdValue = 0;
                                let stakingRewardsPrice = 0;
                                if (staked.gt(0)) {
                                    ({ price: stakingRewardsPrice, usdValue: stakingRewardsUsdValue } = fetchUsdValue(
                                        coingeckoResponse,
                                        contractStaticInfo.tokensDetailRewards[0],
                                        stakingRewards
                                    ));
                                }

                                const stakeFeesContract = getReadContract(contractStaticInfo.chainId, contractStaticInfo.extraAddresses[0], contractStaticInfo.extraABIs[0]);
                                const feeStakingRewards = await stakeFeesContract.claimable(address);
                                const feeStakingRewardsCA = CurrencyAmount.fromRawAmount(contractStaticInfo.tokensDetailRewards[1].token, feeStakingRewards);
                                const feeStakingRewardsExact = feeStakingRewardsCA.toExact();

                                let feeStakingRewardsUsdValue = 0;
                                let feeStakingRewardsPrice = 0;
                                if (staked.gt(0)) {
                                    ({ price: feeStakingRewardsPrice, usdValue: feeStakingRewardsUsdValue } = fetchUsdValue(
                                        coingeckoResponse,
                                        contractStaticInfo.tokensDetailRewards[1],
                                        feeStakingRewards
                                    ));
                                }

                                if (staked.gt(0)) {
                                    deposits.items?.push({
                                        balance: [{
                                            amount: stakedExact,
                                            tokenDetail: contractStaticInfo.tokenDetail,
                                            price: 0,
                                            usdValue: 0
                                        }],
                                        pool: [contractStaticInfo.tokenDetail],
                                        rewards: [{
                                            amount: stakingRewardsExact,
                                            tokenDetail: contractStaticInfo.tokensDetailRewards[0],
                                            price: stakingRewardsPrice,
                                            usdValue: stakingRewardsUsdValue
                                        }, {
                                            amount: feeStakingRewardsExact,
                                            tokenDetail: contractStaticInfo.tokensDetailRewards[1],
                                            price: feeStakingRewardsPrice,
                                            usdValue: feeStakingRewardsUsdValue
                                        }],
                                        usdValue: 0,
                                        address: contractStaticInfo.address
                                    });
                                }

                            } catch (error) {
                                debugger;
                            }
                            break;
                        case ProtocolTypes.Vesting:
                            try {
                                const coingeckoResponse = await getCoingeckoPricesFromTokenDetails([
                                    contractStaticInfo.tokensDetailRewards[0]
                                ]);
                                const vestedRewardsBalance = await stakeContract.balanceOf(address);
                                const vestedRewardsBalanceCA = CurrencyAmount.fromRawAmount(contractStaticInfo.tokensDetailRewards[0].token, vestedRewardsBalance);

                                const vestedRewards = await stakeContract.claimable(address);
                                const vestedRewardsCA = CurrencyAmount.fromRawAmount(contractStaticInfo.tokensDetailRewards[0].token, vestedRewards);
                                const vestedRewardsExact = vestedRewardsCA.toExact();

                                let vestedRewardsUsdValue = 0;
                                let vestedRewardsPrice = 0;
                                if (vestedRewardsBalance.gt(0)) {
                                    ({ price: vestedRewardsPrice, usdValue: vestedRewardsUsdValue } = fetchUsdValue(
                                        coingeckoResponse,
                                        contractStaticInfo.tokensDetailRewards[0],
                                        vestedRewards
                                    ));
                                }

                                const vestedBalance = vestedRewardsBalanceCA.subtract(vestedRewardsCA);
                                const vestedBalanceExact = vestedBalance.toExact();


                                if (vestedRewardsBalance.gt(0)) {
                                    deposits.items?.push({
                                        balance: [{
                                            amount: vestedBalanceExact,
                                            tokenDetail: contractStaticInfo.tokenDetail,
                                            price: 0,
                                            usdValue: 0
                                        }],
                                        pool: [contractStaticInfo.tokenDetail],
                                        rewards: [{
                                            amount: vestedRewardsExact,
                                            tokenDetail: contractStaticInfo.tokensDetailRewards[0],
                                            price: vestedRewardsPrice,
                                            usdValue: vestedRewardsUsdValue
                                        }],
                                        usdValue: 0,
                                        address: contractStaticInfo.address
                                    });
                                }
                            } catch (error) {
                                debugger;
                            }
                            break;
                    }
                }
            })
        );
        return deposits;
    }
}
export default gmxAdapter;
