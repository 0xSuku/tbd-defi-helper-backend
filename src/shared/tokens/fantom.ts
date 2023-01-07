import { Token } from "@uniswap/sdk-core";
import { TokenInfo } from "../types/tokens";
import { ChainId } from "../chains";

const fantom: TokenInfo = {
    esMMY: {
        token: new Token(ChainId.Fantom, '0xe41c6c006de9147fc4c84b20cdfbfc679667343f', 18, 'esMMY', 'Escrowed MMY'),
    },
    fsMLP: {
        token: new Token(ChainId.Fantom, '0xffb69477fee0daeb64e7de89b57846afa990e99c', 18, 'fsMLP', 'Staked MLP'),
    },
};

export default fantom;