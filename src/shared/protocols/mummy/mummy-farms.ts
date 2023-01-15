import { ChainId } from "../../chains";
import { Tokens } from "../../tokens";
import { ContractStaticInfo } from "../../types/protocols";
import { rewardTrackerABI, stakerABI, vesterABI } from "../abi/base/gmx-abis";
import { Protocols, ProtocolTypes } from "../constants";
import { fMLPAddress, fMMYAddress } from "./mummy-addresses";

export const mummyFarms: ContractStaticInfo[] = [
    {
        abi: stakerABI,
        address: Tokens.fantom.sMMY.token.address,
        name: 'Staked MMY',
        protocol: Protocols.Mummy,
        type: ProtocolTypes.Staking,
        chainId: ChainId.Fantom,
        tokenDetail: Tokens.fantom.sMMY,
        tokensDetailRewards: [
            Tokens.fantom.esMMY,
            Tokens.fantom.WFTM,
        ],
        extraAddresses: [fMMYAddress],
        extraABIs: [JSON.stringify(rewardTrackerABI)],
    }, {
        abi: stakerABI,
        address: Tokens.fantom.fsMLP.token.address,
        name: 'Staked MLP',
        protocol: Protocols.Mummy,
        type: ProtocolTypes.Staking,
        chainId: ChainId.Fantom,
        tokenDetail: Tokens.fantom.fsMLP,
        tokensDetailRewards: [
            Tokens.fantom.esMMY,
            Tokens.fantom.WFTM,
        ],
        extraAddresses: [fMLPAddress],
        extraABIs: [JSON.stringify(rewardTrackerABI)],
    }, {
        abi: vesterABI,
        address: Tokens.fantom.vMMY.token.address,
        name: 'Vesting MMY',
        protocol: Protocols.Mummy,
        type: ProtocolTypes.Vesting,
        chainId: ChainId.Fantom,
        tokenDetail: Tokens.fantom.vMMY,
        tokensDetailRewards: [Tokens.fantom.MMY]
    }, {
        abi: vesterABI,
        address: Tokens.fantom.vMLP.token.address,
        name: 'Vesting MLP',
        protocol: Protocols.Mummy,
        type: ProtocolTypes.Vesting,
        chainId: ChainId.Fantom,
        tokenDetail: Tokens.fantom.vMLP,
        tokensDetailRewards: [Tokens.fantom.MMY]
    }
]