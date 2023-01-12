import { Token } from "@uniswap/sdk-core";
import { TokenInfo } from "../types/tokens";
import { ChainId } from "../chains";
import { TokenTypes } from "../constants/token";

const metis: TokenInfo = {
    QI: {
        token: new Token(ChainId.Metis, '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d', 18, 'QI', 'Qi DAO'),
        tokenInfo: TokenTypes.QI,
    },
    USDC: {
        token: new Token(ChainId.Metis, '0xEA32A96608495e54156Ae48931A7c20f0dcc1a21', 6, 'm.USDC', 'm.USDC'),
        tokenInfo: TokenTypes.USDC,
    },
    MAI: {
        token: new Token(ChainId.Metis, '0xdFA46478F9e5EA86d57387849598dbFB2e964b02', 18, 'MAI', 'MAI'),
        tokenInfo: TokenTypes.MAI,
    },
    HUM: {
        token: new Token(ChainId.Metis, '0x4aAC94985cD83be30164DfE7e9AF7C054D7d2121', 18, 'HUM', 'HUM'),
        tokenInfo: TokenTypes.HUM,
    },
};

export default metis;