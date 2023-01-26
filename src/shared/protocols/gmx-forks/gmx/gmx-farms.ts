import { ChainId } from "../../../chains";
import { Tokens } from "../../../tokens";
import { GmxProtocolDeposit } from "../../../types/protocols";
import { PoolInfo } from "../../entities/deposit";
import { GmxStakeDepositInfo, GmxVestDepositInfo } from "../../entities/gmx";
import { vaultABI } from "../gmx-abis";

export const fGlpAddress = '0x4e971a87900b931fF39d1Aad67697F49835400b6';
export const fGmxAddress = '0xd2D1162512F927a7e282Ef43a362659E4F2a728F';
export const gmxRewardRouterAddress = '0xa906f338cb21815cbc4bc87ace9e68c87ef8d8f1';

const stakedGmx = new GmxStakeDepositInfo('Staked GMX', Tokens.arbitrum.sGMX, fGmxAddress);
const glpPoolInfo: PoolInfo = new PoolInfo([
    Tokens.arbitrum.USDC,
    Tokens.arbitrum.WETH,
    Tokens.arbitrum.WBTC,
    Tokens.arbitrum.FRAX,
    Tokens.arbitrum.LINK,
    Tokens.arbitrum.UNI,
    Tokens.arbitrum.MIM,
], '0x489ee077994b6658eafa855c308275ead8097c4a', ChainId.Arbitrum, vaultABI);
const stakedGlp = new GmxStakeDepositInfo('Staked GLP', Tokens.arbitrum.fsGLP, fGlpAddress, glpPoolInfo);
const vestedGmx = new GmxVestDepositInfo('Vesting GMX', Tokens.arbitrum.vGLP);
const vestedGlp = new GmxVestDepositInfo('Vesting GLP', Tokens.arbitrum.vGMX);

export const gmxFarms: GmxProtocolDeposit[] = [
    stakedGmx,
    stakedGlp,
    vestedGmx,
    vestedGlp
];