import { CurrencyAmount, Token } from "@uniswap/sdk-core";
import { getReadContract } from "../../shared/chains";
import { ContractStaticInfo, ProtocolInfo } from "../../shared/types/protocols";
import { ProtocolTypes } from "../../shared/protocols/constants";

export interface IProtocolAdapter {
    getStakingInfo: (address: string, gmxFarms: ContractStaticInfo[], nativeToken?: Token) => Promise<ProtocolInfo>;
}

const gmxAdapter: IProtocolAdapter = {
    getStakingInfo: async (address: string, gmxFarms: ContractStaticInfo[], nativeToken?: Token) => {
        if (!nativeToken) throw new Error('Should have the native token set');

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

                                const staked = await stakeContract.stakedAmounts(address);
                                const stakedCA = CurrencyAmount.fromRawAmount(contractStaticInfo.token, staked);
                                const depositBalance = stakedCA.toExact();

                                const stakingRewards = await stakeContract.claimable(address);
                                const stakingRewardsCA = CurrencyAmount.fromRawAmount(contractStaticInfo.tokenRewards, stakingRewards);
                                const rewardBalance = stakingRewardsCA.toExact();

                                const stakeFeesContract = getReadContract(contractStaticInfo.chainId, contractStaticInfo.extraAddresses[0], contractStaticInfo.extraABIs[0]);
                                const feeStakingRewards = await stakeFeesContract.claimable(address);
                                const feeStakingRewardsCA = CurrencyAmount.fromRawAmount(nativeToken, feeStakingRewards);
                                const rewardBalance2 = feeStakingRewardsCA.toExact();

                                deposits.items?.push({
                                    balance: [{
                                        amount: depositBalance,
                                        currency: contractStaticInfo.token
                                    }],
                                    pool: [contractStaticInfo.token],
                                    rewards: [{
                                        amount: rewardBalance,
                                        currency: contractStaticInfo.tokenRewards
                                    }, {
                                        amount: rewardBalance2,
                                        currency: nativeToken
                                    }],
                                    usdValue: 0,
                                    address: contractStaticInfo.address
                                });

                            } catch (error) {
                                debugger;
                            }
                            break;
                        case ProtocolTypes.Vesting:
                            try {
                                // const vested = await stakeContract.getVestedAmount(address);
                                // const vestedCA = CurrencyAmount.fromRawAmount(contractStaticInfo.token, vested);
                                // const depositBalance = vestedCA.toExact();
                                
                                const vestedRewardsBalance = await stakeContract.balanceOf(address);
                                const vestedRewardsBalanceCA = CurrencyAmount.fromRawAmount(contractStaticInfo.tokenRewards, vestedRewardsBalance);

                                const vestedRewards = await stakeContract.claimable(address);
                                const vestedRewardsCA = CurrencyAmount.fromRawAmount(contractStaticInfo.tokenRewards, vestedRewards);
                                const vestedRewardsExact = vestedRewardsCA.toExact();

                                const vestedBalance =vestedRewardsBalanceCA.subtract(vestedRewardsCA);
                                const vestedBalanceExact = vestedBalance.toExact();


                                deposits.items?.push({
                                    balance: [{
                                        amount: vestedBalanceExact,
                                        currency: contractStaticInfo.token
                                    }],
                                    pool: [contractStaticInfo.token],
                                    rewards: [{
                                        amount: vestedRewardsExact,
                                        currency: contractStaticInfo.tokenRewards
                                    }],
                                    usdValue: 0,
                                    address: contractStaticInfo.address
                                });
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
