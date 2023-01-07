import { CurrencyAmount } from "@uniswap/sdk-core";
import { getReadContract } from "../../chains";
import { ContractStaticInfo, ProtocolInfo } from "../../types/protocols";
import { ProtocolTypes } from "../constants";
import mummyFarms from "./mummy-farms";

export interface IProtocolAdapter {
    getStakingInfo: (address: string) => Promise<ProtocolInfo>;
}

const mummyAdapter: IProtocolAdapter = {
    getStakingInfo: async (address: string) => {
        let farms: ProtocolInfo = {
            type: ProtocolTypes.Farms,
            items: []
        };
        
        await Promise.all(
            mummyFarms.map(async (contractStaticInfo: ContractStaticInfo) => {
                let depositBalance = '0';
                let rewardBalance = '0';

                const contract = getReadContract(contractStaticInfo.chainId, contractStaticInfo.address, JSON.stringify(contractStaticInfo.abi));
                if (contract && contractStaticInfo.params) {
                    const deposited = await contract.stakedAmounts(address);
                    const dep = CurrencyAmount.fromRawAmount(contractStaticInfo.token, deposited);
                    depositBalance = dep.toExact();

                    // esMMY rewards
                    const rewards = await contract.claimable(address);
                    const rew = CurrencyAmount.fromRawAmount(contractStaticInfo.tokenRewards, rewards);
                    rewardBalance = rew.toExact();

                    farms.items?.push({
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
                }
            })
        );
        return farms;
    }
}
export default mummyAdapter;
