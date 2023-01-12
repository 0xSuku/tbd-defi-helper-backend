import { Token } from "@uniswap/sdk-core";
import { TokenInfo } from "../types/tokens";
import { ChainId } from "../chains";
import { TokenTypes } from "../constants/token";

const ethereum: TokenInfo = {
    CRV: {
        token: new Token(ChainId.Ethereum, '0xD533a949740bb3306d119CC777fa900bA034cd52', 18, 'CRV', 'CRV'),
        tokenInfo: TokenTypes.CRV,
    },
    USDC: {
        token: new Token(ChainId.Ethereum, '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', 6, 'USDC', 'USDC'),
        tokenInfo: TokenTypes.USDC,
    },
    SNX: {
        token: new Token(ChainId.Ethereum, '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f', 18, 'SNX', 'SNX'),
        tokenInfo: TokenTypes.SNX,
    },
};

export default ethereum;