import { Token } from "@uniswap/sdk-core";
import { ChainId } from "../../chains";
import { TokenTypes } from "../../constants/token";
import { Tokens } from "../../tokens";
import { ContractStaticInfo, QiDaoProtocolDeposit } from "../../types/protocols";
import { Protocols, ProtocolTypes } from "../constants";
import { QiDaoFarmVaultDepositInfo } from "../entities/qidao";
import { qiFarmABI } from "./qidao-abis";


const vaultArrakisMaiUsdc = new QiDaoFarmVaultDepositInfo({
    name: 'USDC-MAI Arrakis Vault',
    protocol: Protocols.Qi_Dao,
    chainId: ChainId.Polygon,
    contractAddress: '0x9f9f0456005ed4e7248199b6260752e95682a883',
    vaultId: '0',
    tokenDetailsVault: {
        token: new Token(ChainId.Polygon, '0xa199569af06cb68960869fe376c9b41f68d8e2d1', 18, 'Arrakis Vault V1 USDC/miMATIC', 'USDC+MAI'),
        tokenInfo: TokenTypes.UNUSED,
    },
    tokenDetailsRewards: Tokens.polygon.QI
});

const vaultQuickswapMaiUsdc = new QiDaoFarmVaultDepositInfo({
    name: 'MAI-USDC Quickswap LP',
    protocol: Protocols.Qi_Dao,
    chainId: ChainId.Polygon,
    contractAddress: '0xcc54afcecd0d89e0b2db58f5d9e58468e7ad20dc',
    vaultId: '0',
    tokenDetailsVault: {
        token: new Token(ChainId.Polygon, '0x9a8b2601760814019b7e6ee0052e25f1c623d1e6', 18, 'Uniswap V2 (UNI-V2)', 'MAI+USDC'),
        tokenInfo: TokenTypes.UNUSED,
    },
    tokenDetailsRewards: Tokens.polygon.QI
});

const vaultQuickswapQiMatic = new QiDaoFarmVaultDepositInfo({
    name: 'QI-WMATIC Quickswap LP',
    protocol: Protocols.Qi_Dao,
    chainId: ChainId.Polygon,
    contractAddress: '0xcc54afcecd0d89e0b2db58f5d9e58468e7ad20dc',
    vaultId: '1',
    tokenDetailsVault: {
        token: new Token(ChainId.Polygon, '0x9a8b2601760814019b7e6ee0052e25f1c623d1e6', 18, 'Uniswap V2 (UNI-V2)', 'QI+WMATIC'),
        tokenInfo: TokenTypes.UNUSED,
    },
    tokenDetailsRewards: Tokens.polygon.QI
});

export const qiFarms: QiDaoProtocolDeposit[] = [
    vaultArrakisMaiUsdc,
    vaultQuickswapMaiUsdc,
    vaultQuickswapQiMatic
];

export default qiFarms;
