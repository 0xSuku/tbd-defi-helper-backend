import { ChainId } from "../../../chains";
import { Tokens } from "../../../tokens";
import { PoolInfo } from "../../entities/deposit";
import { SolidlyGaugeV2DepositInfoBase, ThenaGaugeV2DepositInfo } from "../../entities/solidly";
import { pairABI } from "../solidly-abis";
import { ThenaTokens } from "./thena-tokens";

const sAMM_USDC_BUSD_PoolInfo: PoolInfo = new PoolInfo([
    Tokens.bnb.USDC,
    Tokens.bnb.BUSD,
], ThenaTokens.sAMM_USDC_BUSD.token.address, ChainId.BNB, pairABI);
const sAMM_USDC_BUSD = new ThenaGaugeV2DepositInfo(
    'USDC-BUSD',
    '0x11e79bc17cb1ff3d4f6a025412ac84960b20ba81',
    ThenaTokens.sAMM_USDC_BUSD,
    sAMM_USDC_BUSD_PoolInfo
);

const sAMM_HAY_BUSD_PoolInfo: PoolInfo = new PoolInfo([
    Tokens.bnb.HAY,
    Tokens.bnb.BUSD,
], ThenaTokens.sAMM_HAY_BUSD.token.address, ChainId.BNB, pairABI);
const sAMM_HAY_BUSD = new ThenaGaugeV2DepositInfo(
    'HAY-BUSD',
    '0xe43317c1f037cbbaf33f33c386f2caf2b6b25c9c',
    ThenaTokens.sAMM_HAY_BUSD,
    sAMM_HAY_BUSD_PoolInfo
);

const sAMM_MAI_BUSD_PoolInfo: PoolInfo = new PoolInfo([
    Tokens.bnb.MAI,
    Tokens.bnb.BUSD,
], ThenaTokens.sAMM_MAI_BUSD.token.address, ChainId.BNB, pairABI);
const sAMM_MAI_BUSD = new ThenaGaugeV2DepositInfo(
    'MAI-BUSD',
    '0x6fc3e598c8cc6d1e49b6233205b69ae07ab41c72',
    ThenaTokens.sAMM_MAI_BUSD,
    sAMM_MAI_BUSD_PoolInfo
);

const vAMM_WBNB_THE_PoolInfo: PoolInfo = new PoolInfo([
    Tokens.bnb.WBNB,
    Tokens.bnb.THE,
], ThenaTokens.vAMM_WBNB_THE.token.address, ChainId.BNB, pairABI);
const vAMM_WBNB_THE = new ThenaGaugeV2DepositInfo(
    'WBNB-THE',
    '0x638b0cc37ffe5a040079f75ae6c50c9a386ddcaf',
    ThenaTokens.vAMM_WBNB_THE,
    vAMM_WBNB_THE_PoolInfo
);

const vAMM_BUSD_THE_PoolInfo: PoolInfo = new PoolInfo([
    Tokens.bnb.BUSD,
    Tokens.bnb.THE,
], ThenaTokens.vAMM_BUSD_THE.token.address, ChainId.BNB, pairABI);
const vAMM_BUSD_THE = new ThenaGaugeV2DepositInfo(
    'BUSD-THE',
    '0x8a8ec422fc51b2a88dd5be489c40aaf1e1fa73d0',
    ThenaTokens.vAMM_BUSD_THE,
    vAMM_BUSD_THE_PoolInfo
);

const vAMM_DEI_BUSD_PoolInfo: PoolInfo = new PoolInfo([
    Tokens.bnb.DEI,
    Tokens.bnb.BUSD,
], ThenaTokens.vAMM_DEI_BUSD.token.address, ChainId.BNB, pairABI);
const vAMM_DEI_BUSD = new ThenaGaugeV2DepositInfo(
    'DEI-BUSD',
    '0xaff65f90e50c371481bef5f3815ef3a891c0a91b',
    ThenaTokens.vAMM_DEI_BUSD,
    vAMM_DEI_BUSD_PoolInfo
);

const sAMM_IDIA_BUSD_PoolInfo: PoolInfo = new PoolInfo([
    Tokens.bnb.IDIA,
    Tokens.bnb.BUSD,
], ThenaTokens.sAMM_IDIA_BUSD.token.address, ChainId.BNB, pairABI);
const vAMM_IDIA_BUSD = new ThenaGaugeV2DepositInfo(
    'IDIA-BUSD',
    '0xf9b5cb99a576eb9c00446b7fddb69bbb2e002143',
    ThenaTokens.sAMM_IDIA_BUSD,
    sAMM_IDIA_BUSD_PoolInfo
);

const solidlyDeposits: SolidlyGaugeV2DepositInfoBase[] = [
    sAMM_USDC_BUSD,
    sAMM_HAY_BUSD,
    sAMM_MAI_BUSD,
    vAMM_WBNB_THE,
    vAMM_BUSD_THE,
    vAMM_DEI_BUSD,
    vAMM_IDIA_BUSD
];

export default solidlyDeposits;
