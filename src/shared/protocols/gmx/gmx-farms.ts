import { ChainId } from "../../chains";
import { Tokens } from "../../tokens";
import { ContractStaticInfo } from "../../types/protocols";
import { Protocols, ProtocolTypes } from "../constants";
import { fGlpAddress, fGmxAddress, rewardTrackerABI, stakerABI, vesterABI } from "./gmx-abis";

export const gmxFarms: ContractStaticInfo[] = [
    {
        abi: stakerABI,
        address: Tokens.arbitrum.sGMX.token.address,
        name: 'Staked GMX',
        protocol: Protocols.GMX,
        type: ProtocolTypes.Staking,
        chainId: ChainId.Arbitrum,
        tokenDetail: Tokens.arbitrum.sGMX,
        tokensDetailRewards: [
            Tokens.arbitrum.esGMX,
            Tokens.arbitrum.WETH,
        ],
        extraAddresses: [fGmxAddress],
        extraABIs: [JSON.stringify(rewardTrackerABI)],
    }, {
        abi: stakerABI,
        address: Tokens.arbitrum.fsGLP.token.address,
        name: 'Staked GLP',
        protocol: Protocols.GMX,
        type: ProtocolTypes.Staking,
        chainId: ChainId.Arbitrum,
        tokenDetail: Tokens.arbitrum.fsGLP,
        tokensDetailRewards: [
            Tokens.arbitrum.esGMX,
            Tokens.arbitrum.WETH,
        ],
        extraAddresses: [fGlpAddress],
        extraABIs: [JSON.stringify(rewardTrackerABI)],
    }, {
        abi: vesterABI,
        address: Tokens.arbitrum.vGMX.token.address,
        name: 'Vesting GMX',
        protocol: Protocols.GMX,
        type: ProtocolTypes.Vesting,
        chainId: ChainId.Arbitrum,
        tokenDetail: Tokens.arbitrum.vGMX,
        tokensDetailRewards: [Tokens.arbitrum.GMX]
    }, {
        abi: vesterABI,
        address: Tokens.arbitrum.vGLP.token.address,
        name: 'Vesting GLP',
        protocol: Protocols.GMX,
        type: ProtocolTypes.Vesting,
        chainId: ChainId.Arbitrum,
        tokenDetail: Tokens.arbitrum.vGLP,
        tokensDetailRewards: [Tokens.arbitrum.GMX]
    }
]