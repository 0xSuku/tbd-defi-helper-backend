import { Token } from "@uniswap/sdk-core";
import { TokenInfo } from "../../shared/types";
import { ChainId } from "../chains";

const nativeTokens: TokenInfo = {
    1: {
        token: new Token(ChainId.Ethereum, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 18, 'ETH', 'Ethereum'),
    },
    137: {
        token: new Token(ChainId.Polygon, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 18, 'MATIC', 'Matic'),
    },
    250: {
        token: new Token(ChainId.Fantom, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 18, 'FTM', 'Fantom'),
    }
};

export default nativeTokens;