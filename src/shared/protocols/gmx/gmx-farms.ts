import { ChainId } from "../../chains";
import { Tokens } from "../../tokens";
import { GmxProtocolDeposit } from "../../types/protocols";
import { Protocols } from "../constants";
import { GmxStakeDepositInfo, GmxVestDepositInfo } from "../entities/gmx";

export const fGlpAddress = '0x4e971a87900b931fF39d1Aad67697F49835400b6';
export const fGmxAddress = '0xd2D1162512F927a7e282Ef43a362659E4F2a728F';
export const rewardRouterAddress = '0xa906f338cb21815cbc4bc87ace9e68c87ef8d8f1';

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

export const gmxFarms: GmxProtocolDeposit[] = [
    stakedGmx,
    stakedGlp,
    vestedGmx,
    vestedGlp
];