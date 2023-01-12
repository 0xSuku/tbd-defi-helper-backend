import { Token } from "@uniswap/sdk-core";
import { TokenInfo } from "../../shared/types/tokens";
import { ChainId } from "../chains";
import { TokenTypes } from "../constants/token";

const nativeTokens: TokenInfo = {
    1: {
        token: new Token(ChainId.Ethereum, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 18, 'ETH', 'Ethereum'),
        tokenInfo: TokenTypes.ETH,
    },
    10: {
        token: new Token(ChainId.Optimism, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 18, 'ETH', 'Optimism Ethereum'),
        tokenInfo: TokenTypes.ETH,
    },
    56: {
        token: new Token(ChainId.BNB, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 18, 'BNB', 'BNB'),
        tokenInfo: TokenTypes.BNB,
    },
    100: {
        token: new Token(ChainId.Gnosis, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 18, 'xDAI', 'xDAI'),
        tokenInfo: TokenTypes.DAI,
    },
    137: {
        token: new Token(ChainId.Polygon, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 18, 'MATIC', 'Matic'),
        tokenInfo: TokenTypes.MATIC,
    },
    250: {
        token: new Token(ChainId.Fantom, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 18, 'FTM', 'Fantom'),
        tokenInfo: TokenTypes.FTM,
    },
    1088: {
        token: new Token(ChainId.Metis, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 18, 'METIS', 'METIS'),
        tokenInfo: TokenTypes.METIS,
    },
    2001: {
        token: new Token(ChainId.Milkomeda, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 18, 'ADA', 'ADA'),
        tokenInfo: TokenTypes.ADA,
    },
    42161: {
        token: new Token(ChainId.Arbitrum, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 18, 'ETH', 'Arbitrum Ethereum'),
        tokenInfo: TokenTypes.ETH,
    },
    43114: {
        token: new Token(ChainId.Avalanche, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 18, 'AVAX', 'AVAX'),
        tokenInfo: TokenTypes.AVAX,
    },
};

export default nativeTokens;