import { ChainId } from "../../chains";
import { Tokens } from "../../tokens";
import { GmxProtocolDeposit } from "../../types/protocols";
import { Protocols } from "../constants";
import { GmxStakeDepositInfo, GmxVestDepositInfo } from "../entities/gmx";

export const fMLPAddress = '0x7b26207457a9f8ff4fd21a7a0434066935f1d8e7';
export const fMMYAddress = '0xe149164d8eca659e8912dbdec35e3f7e71fb5789';
export const mummyRewardRouterAddress = '0x7b9e962dd8aed0db9a1d8a2d7a962ad8b871ce4f';

const stakedGmx = new GmxStakeDepositInfo({
    name: 'Staked MMY',
    protocol: Protocols.Mummy,
    chainId: ChainId.Fantom,
    tokenDetailsStake: Tokens.fantom.sMMY,
    tokenDetailsRewards: Tokens.fantom.esMMY,
    tokenDetailsFeeRewards: Tokens.fantom.WFTM,
    feeStakeTokenAddress: fMMYAddress
});
const stakedGlp = new GmxStakeDepositInfo({
    name: 'Staked MLP',
    protocol: Protocols.Mummy,
    chainId: ChainId.Fantom,
    tokenDetailsStake: Tokens.fantom.fsMLP,
    tokenDetailsRewards: Tokens.fantom.esMMY,
    tokenDetailsFeeRewards: Tokens.fantom.WFTM,
    feeStakeTokenAddress: fMLPAddress
});
const vestedGmx = new GmxVestDepositInfo({
    name: 'Vesting MMY',
    protocol: Protocols.Mummy,
    chainId: ChainId.Fantom,
    tokenDetailsVest: Tokens.fantom.vMLP,
    tokenDetailsRewards: Tokens.fantom.MMY,
});
const vestedGlp = new GmxVestDepositInfo({
    name: 'Vesting MLP',
    protocol: Protocols.Mummy,
    chainId: ChainId.Fantom,
    tokenDetailsVest: Tokens.fantom.vMMY,
    tokenDetailsRewards: Tokens.fantom.MMY,
});

export const mummyFarms: GmxProtocolDeposit[] = [
    stakedGmx,
    stakedGlp,
    vestedGmx,
    vestedGlp
];