import { ChainId } from "../../../chains";
import { Tokens } from "../../../tokens";
import { GmxProtocolDeposit } from "../../../types/protocols";
import { PoolInfo } from "../../entities/deposit";
import { BaymaxStakeDepositInfo, BaymaxVestDepositInfo } from "../../entities/gmx";
import { vaultABI } from "../gmx-abis";

export const rewardRouterV2 = '0x8fa98e7a80d90725e23fec8cef36b2551b2e364d';
export const feeGlpTracker = '0x27599af3e4606da5447911e9c6e703d2283fb585';
export const feeGmxTracker = '0xbb03972d69a710dc521642f806ec69631477ce42';

const stakedGmx = new BaymaxStakeDepositInfo('Staked BAY', Tokens.avalanche.sBAY, feeGmxTracker);
const glpPoolInfo: PoolInfo = new PoolInfo([
    Tokens.avalanche.USDC,
    Tokens.avalanche.USDCe,
    Tokens.avalanche.WETHe,
    Tokens.avalanche.BTCb,
    Tokens.avalanche.WBTCe,
    Tokens.avalanche.WAVAX,
], '0xa6d7d0e650aa40ffa42d845a354c12c2bc0ab15f', ChainId.Fantom, vaultABI);
const stakedGlp = new BaymaxStakeDepositInfo('Staked BLP', Tokens.avalanche.fsBLP, feeGlpTracker, glpPoolInfo);
const vestedGmx = new BaymaxVestDepositInfo('Vesting BAY', Tokens.avalanche.vBLP);
const vestedGlp = new BaymaxVestDepositInfo('Vesting BLP', Tokens.avalanche.vBAY);

export const baymaxFarms: GmxProtocolDeposit[] = [
    stakedGmx,
    stakedGlp,
    vestedGmx,
    vestedGlp
];