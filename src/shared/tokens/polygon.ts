import { Token } from "@uniswap/sdk-core";
import { TokenInfo } from "../../shared/types/tokens";
import { ChainId } from "../chains";
import { TokenTypes } from "../constants/token";

const polygon: TokenInfo = {
    QI: {
        token: new Token(ChainId.Polygon, '0x580a84c73811e1839f75d86d75d88cca0c241ff4', 18, 'QI', 'Qi DAO'),
        tokenInfo: TokenTypes.QI,
    },
    DHV: {
        token: new Token(ChainId.Polygon, '0x5fCB9de282Af6122ce3518CDe28B7089c9F97b26', 18, 'DHV', 'DHV'),
        tokenInfo: TokenTypes.DHV,
    },
    USDC: {
        token: new Token(ChainId.Polygon, '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', 6, 'USDC', 'USDC'),
        tokenInfo: TokenTypes.USDC,
    },
};

export default polygon;