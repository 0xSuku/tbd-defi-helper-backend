import { Token } from "@uniswap/sdk-core";
import { ChainId } from "../../chains";
import { TokenTypes } from "../../constants/token";

export const QiDaoTokens = {
    RAKIS_30: {
        token: new Token(ChainId.Polygon, '0xa199569af06cb68960869fe376c9b41f68d8e2d1', 18, 'RAKIS-30', 'RAKIS-30'),
        tokenInfo: TokenTypes.UNUSED,
    },
    UNI_V2: {
        token: new Token(ChainId.Polygon, '0x9a8b2601760814019b7e6ee0052e25f1c623d1e6', 18, 'UNI-V2', 'UNI-V2'),
        tokenInfo: TokenTypes.UNUSED,
    },
}