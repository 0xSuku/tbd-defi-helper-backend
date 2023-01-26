import { ChainId } from "../../chains";
import { Tokens } from "../../tokens";
import { QiDaoProtocolDeposit } from "../../types/protocols";
import { arrakisVaultV1 } from "../arrakis/arrakis-abis";
import { ArrakisPoolInfo, PoolInfo } from "../entities/deposit";
import { QiDaoFarmVaultDepositInfo } from "../entities/qidao";
import { QiDaoTokens } from "./qidao-tokens";

const arrakis_MAI_USDC_PoolInfo: ArrakisPoolInfo = new ArrakisPoolInfo([
    Tokens.polygon.USDC,
    Tokens.polygon.MAI,
], QiDaoTokens.RAKIS_30.token.address, ChainId.Polygon, arrakisVaultV1);
const arrakis_MAI_USDC = new QiDaoFarmVaultDepositInfo(
    'USDC-MAI Arrakis Vault',
    ChainId.Polygon,
    '0x9f9f0456005ed4e7248199b6260752e95682a883',
    '0',
    QiDaoTokens.RAKIS_30,
    Tokens.polygon.QI,
    arrakis_MAI_USDC_PoolInfo
);

const quickswap_MAI_USDC_PoolInfo: PoolInfo = new PoolInfo([
    Tokens.polygon.MAI,
    Tokens.polygon.USDC,
], QiDaoTokens.UNI_V2.token.address, ChainId.Polygon, arrakisVaultV1);
const quickswap_MAI_USDC = new QiDaoFarmVaultDepositInfo(
    'MAI-USDC Quickswap LP',
    ChainId.Polygon,
    '0xcc54afcecd0d89e0b2db58f5d9e58468e7ad20dc',
    '0',
    QiDaoTokens.UNI_V2,
    Tokens.polygon.QI,
    quickswap_MAI_USDC_PoolInfo
);

const quickswap_QI_WMATIC_PoolInfo: PoolInfo = new PoolInfo([
    Tokens.polygon.QI,
    Tokens.polygon.WMATIC,
], QiDaoTokens.UNI_V2.token.address, ChainId.Polygon, arrakisVaultV1);
const quickswap_QI_WMATIC = new QiDaoFarmVaultDepositInfo(
    'QI-WMATIC Quickswap LP',
    ChainId.Polygon,
    '0xcc54afcecd0d89e0b2db58f5d9e58468e7ad20dc',
    '1',
    QiDaoTokens.UNI_V2,
    Tokens.polygon.QI,
    quickswap_QI_WMATIC_PoolInfo
);

const qiFarms: QiDaoProtocolDeposit[] = [
    arrakis_MAI_USDC,
    quickswap_MAI_USDC,
    quickswap_QI_WMATIC
];

export default qiFarms;
