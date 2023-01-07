import { CurrencyAmount } from "@uniswap/sdk-core";
import { getReadContract } from "../../chains";
import { ContractStaticInfo, ProtocolInfo } from "../../types/protocols";
import { ProtocolTypes } from "../constants";
import qiFarms from "./qidao-farms";

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
                let depositBalance = '0';
                let rewardBalance = '0';

                const contract = getReadContract(contractStaticInfo.chainId, contractStaticInfo.address, JSON.stringify(contractStaticInfo.abi));
                if (contract && contractStaticInfo.params) {
                    const deposited = await contract.deposited(contractStaticInfo.params[0], address);
                    const dep = CurrencyAmount.fromRawAmount(contractStaticInfo.token, deposited);
                    depositBalance = dep.toExact();
                    const rewards = await contract.pending(contractStaticInfo.params[0], address);
                    const rew = CurrencyAmount.fromRawAmount(contractStaticInfo.token, rewards);
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
export default qiAdapter;