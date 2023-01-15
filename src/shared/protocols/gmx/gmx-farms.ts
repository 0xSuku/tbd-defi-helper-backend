import { ChainId } from "../../chains";
import { Tokens } from "../../tokens";
import { ContractStaticInfo, ProtocolDeposit } from "../../types/protocols";
import { rewardTrackerABI, stakerABI, vesterABI } from "../abi/base/gmx-abis";
import { Protocols, ProtocolTypes } from "../constants";
import { GmxStakeDepositInfo, GmxVestDepositInfo } from "../entities/deposit";
import { fGlpAddress, fGmxAddress } from "./gmx-abis";

const stakedGmx = new GmxStakeDepositInfo({
    name: 'Staked GMX',
    protocol: Protocols.GMX,
    chainId: ChainId.Arbitrum,
    tokenDetailsStake: Tokens.arbitrum.sGMX,
    tokenDetailsRewards: Tokens.arbitrum.esGMX,
    tokenDetailsFeeRewards: Tokens.arbitrum.WETH,
    feeStakeTokenAddress: fGmxAddress
});
const stakedGlp = new GmxStakeDepositInfo({
    name: 'Staked GLP',
    protocol: Protocols.GMX,
    chainId: ChainId.Arbitrum,
    tokenDetailsStake: Tokens.arbitrum.fsGLP,
    tokenDetailsRewards: Tokens.arbitrum.esGMX,
    tokenDetailsFeeRewards: Tokens.arbitrum.WETH,
    feeStakeTokenAddress: fGlpAddress
});
const vestedGmx = new GmxVestDepositInfo({
    name: 'Vesting GMX',
    protocol: Protocols.GMX,
    chainId: ChainId.Arbitrum,
    tokenDetailsVest: Tokens.arbitrum.vGLP,
    tokenDetailsRewards: Tokens.arbitrum.GMX,
});
const vestedGlp = new GmxVestDepositInfo({
    name: 'Vesting GLP',
    protocol: Protocols.GMX,
    chainId: ChainId.Arbitrum,
    tokenDetailsVest: Tokens.arbitrum.vGMX,
    tokenDetailsRewards: Tokens.arbitrum.GMX,
});

export const gmxFarms: ProtocolDeposit[] = [
    stakedGmx,
    stakedGlp,
    vestedGmx,
    vestedGlp
];

export const gmxFarms2: ContractStaticInfo[] = [
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