import { Token } from "@uniswap/sdk-core";
import { TokenInfo } from "../types/tokens";
import { ChainId } from "../chains";

const fantom: TokenInfo = {
    esMMY: {
        token: new Token(ChainId.Fantom, '0xe41c6c006de9147fc4c84b20cdfbfc679667343f', 18, 'esMMY', 'Escrowed MMY'),
    },
    MMY: {
        token: new Token(ChainId.Fantom, '0x01e77288b38b416F972428d562454fb329350bAc', 18, 'MMY', 'MUMMY'),
    },
    fsMLP: {
        token: new Token(ChainId.Fantom, '0xffb69477fee0daeb64e7de89b57846afa990e99c', 18, 'fsMLP', 'Staked MLP'),
    },
    vMMY: {
        token: new Token(ChainId.Fantom, '0xa1a65d3639a1efbfb18c82003330a4b1fb620c5a', 18, 'vMMY', 'Vested MMY'),
    },
    vMLP: {
        token: new Token(ChainId.Fantom, '0x2a3e489f713ab6f652af930555b5bb3422711ac1', 18, 'vMLP', 'Vested MLP'),
    },    
};

export default fantom;