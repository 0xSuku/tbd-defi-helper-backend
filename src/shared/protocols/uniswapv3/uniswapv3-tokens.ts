import { Token } from "@uniswap/sdk-core";
import { ChainId } from "../../chains";
import { TokenTypes } from "../../constants/token";

export const UniswapV3Tokens = {
    UNI_V3_POS: {
        token: new Token(ChainId.Arbitrum, '0xC36442b4a4522E871399CD717aBDD847Ab11FE88', 18, 'UNI-V3-POS', 'UNI-V3-POS'),
        tokenInfo: TokenTypes.UNUSED,
    }
}