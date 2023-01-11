import { Token } from "@uniswap/sdk-core";
import { TokenInfo } from "../../shared/types/tokens";
import { ChainId } from "../chains";
import { TokenTypes } from "../constants/token";

const nativeTokens: TokenInfo = {
    1: {
        token: new Token(ChainId.Ethereum, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 18, 'ETH', 'Ethereum'),
        tokenInfo: TokenTypes.ETH,
    },
    137: {
        token: new Token(ChainId.Polygon, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 18, 'MATIC', 'Matic'),
        tokenInfo: TokenTypes.MATIC,
    },
    250: {
        token: new Token(ChainId.Fantom, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 18, 'FTM', 'Fantom'),
        tokenInfo: TokenTypes.FTM,
    }
};

export default nativeTokens;