import { ChainId } from "../../../chains";
import { Tokens } from "../../../tokens";
import { GmxProtocolDeposit } from "../../../types/protocols";
import { PoolInfo } from "../../entities/deposit";
import { MummyStakeDepositInfo, MummyVestDepositInfo } from "../../entities/gmx";
import { vaultABI } from "../gmx-abis";

export const rewardRouterV2 = '0x7b9e962dd8aed0db9a1d8a2d7a962ad8b871ce4f';
export const feeGlpTracker = '0x7b26207457a9f8ff4fd21a7a0434066935f1d8e7';
export const feeGmxTracker = '0xe149164d8eca659e8912dbdec35e3f7e71fb5789';

const stakedGmx = new MummyStakeDepositInfo('Staked MMY', Tokens.fantom.sMMY, feeGmxTracker);
const glpPoolInfo: PoolInfo = new PoolInfo([
    Tokens.fantom.USDC,
    Tokens.fantom.ETH,
    Tokens.fantom.BTC,
    Tokens.fantom.WFTM,
    Tokens.fantom.DAI,
    Tokens.fantom.fUSDT,
], '0xa6d7d0e650aa40ffa42d845a354c12c2bc0ab15f', ChainId.Fantom, vaultABI);
const stakedGlp = new MummyStakeDepositInfo('Staked MLP', Tokens.fantom.fsMLP, feeGlpTracker, glpPoolInfo);
const vestedGmx = new MummyVestDepositInfo('Vesting MMY', Tokens.fantom.vMLP);
const vestedGlp = new MummyVestDepositInfo('Vesting MLP', Tokens.fantom.vMMY);

export const mummyFarms: GmxProtocolDeposit[] = [
    stakedGmx,
    stakedGlp,
    vestedGmx,
    vestedGlp
];