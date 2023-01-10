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
        disabled: true
    },
    feeMLP: {
        token: new Token(ChainId.Fantom, '0x7b26207457a9f8ff4fd21a7a0434066935f1d8e7', 18, 'fMLP', 'Fee MLP'),
        disabled: true
    },
    sbfMMY: {
        token: new Token(ChainId.Fantom, '0xe149164d8eca659e8912dbdec35e3f7e71fb5789', 18, 'sbfMMY', 'Staked + Bonus + Fee MMY'),
        disabled: true
    },
    vMMY: {
        token: new Token(ChainId.Fantom, '0xa1a65d3639a1efbfb18c82003330a4b1fb620c5a', 18, 'vMMY', 'Vested MMY'),
        disabled: true
    },
    sMMY: {
        token: new Token(ChainId.Fantom, '0x727dB8FA7861340d49d13ea78321D0C9a1a79cd5', 18, 'sMMY', 'Staked MMY'),
        disabled: true
    },
    vMLP: {
        token: new Token(ChainId.Fantom, '0x2a3e489f713ab6f652af930555b5bb3422711ac1', 18, 'vMLP', 'Vested MLP'),
        disabled: true
    },
	WFTM: {
        token: new Token(ChainId.Fantom, '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', 18, 'WFTM', 'Wrapped FTM'),
	},
};

export default fantom;