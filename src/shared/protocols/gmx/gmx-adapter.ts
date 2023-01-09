import { CurrencyAmount } from "@uniswap/sdk-core";
import { getReadContract, getWriteContract } from "../../chains";
import { ContractStaticInfo, ProtocolInfo } from "../../types/protocols";
import { Protocols, ProtocolTypes } from "../constants";
import { mummyFarms } from "./mummy-farms";

export interface IProtocolAdapter {
    getStakingInfo: (address: string) => Promise<ProtocolInfo>;
    claimRewards: (contractStaticInfo: ContractStaticInfo, gmxRewardRouterAddress: string, gmxRewardRouterABI: string) => Promise<void>;
}

const gmxAdapter: IProtocolAdapter = {
    getStakingInfo: async (address: string) => {
        let deposits: ProtocolInfo = {
            type: ProtocolTypes.Farms,
            items: []
        };

        await Promise.all(
            mummyFarms.map(async (contractStaticInfo: ContractStaticInfo) => {
                let depositBalance = '0';
                let rewardBalance = '0';

                const contract = getReadContract(contractStaticInfo.chainId, contractStaticInfo.address, JSON.stringify(contractStaticInfo.abi));
                if (contract) {
                    switch (contractStaticInfo.type) {
                        case ProtocolTypes.Staking:
                            const staked = await contract.stakedAmounts(address);
                            const stakedCA = CurrencyAmount.fromRawAmount(contractStaticInfo.token, staked);
                            depositBalance = stakedCA.toExact();

                            const stakingRewards = await contract.claimable(address);
                            const stakingRewardsCA = CurrencyAmount.fromRawAmount(contractStaticInfo.tokenRewards, stakingRewards);
                            rewardBalance = stakingRewardsCA.toExact();

                            deposits.items?.push({
                                balance: [{
                                    amount: depositBalance,
                                    currency: contractStaticInfo.token
                                }],
                                pool: [contractStaticInfo.token],
                                rewards: [{
                                    amount: rewardBalance,
                                    currency: contractStaticInfo.tokenRewards
                                }],
                                usdValue: 0,
                                address: contractStaticInfo.address
                            });
                            break;
                        case ProtocolTypes.Vesting:
                            const vested = await contract.getVestedAmount(address);
                            const vestedCA = CurrencyAmount.fromRawAmount(contractStaticInfo.token, vested);
                            depositBalance = vestedCA.toExact();

                            const vestingRewards = await contract.claimable(address);
                            const vestingRewardsCA = CurrencyAmount.fromRawAmount(contractStaticInfo.tokenRewards, vestingRewards);
                            rewardBalance = vestingRewardsCA.toExact();

                            deposits.items?.push({
                                balance: [{
                                    amount: depositBalance,
                                    currency: contractStaticInfo.token
                                }],
                                pool: [contractStaticInfo.token],
                                rewards: [{
                                    amount: rewardBalance,
                                    currency: contractStaticInfo.tokenRewards
                                }],
                                usdValue: 0,
                                address: contractStaticInfo.address
                            });
                            break;
                    }
                }
            })
        );
        return deposits;
    },
    claimRewards: async (contractStaticInfo: ContractStaticInfo, gmxRewardRouterAddress: string, gmxRewardRouterABI: string) => {
        switch (contractStaticInfo.protocol) {
            case Protocols.Mummy:
                const contract = await getWriteContract(contractStaticInfo.chainId, gmxRewardRouterAddress, gmxRewardRouterABI);
                if (contract) {
                    await contract.handleRewards(true, false, true, true, true, true, true);
                } else {
                    throw Error('Contract not found');
                }
                break;
        }
    }
}
export default gmxAdapter;
