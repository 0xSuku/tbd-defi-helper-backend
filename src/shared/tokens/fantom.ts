import { Token } from "@uniswap/sdk-core";
import { TokenInfo } from "../types/tokens";
import { ChainId } from "../chains";
import { TokenTypes } from "../constants/token";

const fantom: TokenInfo = {
    fsMLP: {
        token: new Token(ChainId.Fantom, '0xffb69477fee0daeb64e7de89b57846afa990e99c', 18, 'fsMLP', 'Staked MLP'),
        disabled: true,
        tokenInfo: TokenTypes.UNUSED,
    },
    feeMLP: {
        token: new Token(ChainId.Fantom, '0x7b26207457a9f8ff4fd21a7a0434066935f1d8e7', 18, 'fMLP', 'Fee MLP'),
        disabled: true,
        tokenInfo: TokenTypes.UNUSED,
    },
    vMLP: {
        token: new Token(ChainId.Fantom, '0x2a3e489f713ab6f652af930555b5bb3422711ac1', 18, 'vMLP', 'Vested MLP'),
        disabled: true,
        tokenInfo: TokenTypes.UNUSED,
    },
    sbfMMY: {
        token: new Token(ChainId.Fantom, '0xe149164d8eca659e8912dbdec35e3f7e71fb5789', 18, 'sbfMMY', 'Staked + Bonus + Fee MMY'),
        disabled: true,
        tokenInfo: TokenTypes.UNUSED,
    },
    vMMY: {
        token: new Token(ChainId.Fantom, '0xa1a65d3639a1efbfb18c82003330a4b1fb620c5a', 18, 'vMMY', 'Vested MMY'),
        disabled: true,
        tokenInfo: TokenTypes.MMY,
    },
    sMMY: {
        token: new Token(ChainId.Fantom, '0x727dB8FA7861340d49d13ea78321D0C9a1a79cd5', 18, 'sMMY', 'Staked MMY'),
        disabled: true,
        tokenInfo: TokenTypes.MMY,
    },
    WFTM: {
        token: new Token(ChainId.Fantom, '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', 18, 'WFTM', 'Wrapped FTM'),
        tokenInfo: TokenTypes.FTM,
    },
    esMMY: {
        token: new Token(ChainId.Fantom, '0xe41c6c006de9147fc4c84b20cdfbfc679667343f', 18, 'esMMY', 'Escrowed MMY'),
        tokenInfo: TokenTypes.MMY,
    },
    MMY: {
        token: new Token(ChainId.Fantom, '0x01e77288b38b416F972428d562454fb329350bAc', 18, 'MMY', 'MUMMY'),
        tokenInfo: TokenTypes.MMY,
    },
    USDC: {
        token: new Token(ChainId.Fantom, '0x04068da6c83afcfa0e13ba15a6696662335d5b75', 18, 'USDC', 'USDC'),
        tokenInfo: TokenTypes.USDC,
    },
    WBNB: {
        token: new Token(ChainId.Fantom, '0xd67de0e0a0fd7b15dc8348bb9be742f3c5850454', 18, 'WBNB', 'Wrapped BNB'),
        tokenInfo: TokenTypes.BNB,
    },
    MAI: {
        token: new Token(ChainId.Fantom, '0xfB98B335551a418cD0737375a2ea0ded62Ea213b', 18, 'MAI', 'MAI'),
        tokenInfo: TokenTypes.MAI,
    },
    CRV: {
        token: new Token(ChainId.Fantom, '0x1E4F97b9f9F913c46F1632781732927B9019C68b', 18, 'CRV', 'Curve'),
        tokenInfo: TokenTypes.CRV,
    },
    WETH: {
        token: new Token(ChainId.Fantom, '0x74b23882a30290451A17c44f4F05243b6b58C76d', 18, 'WETH', 'WETH'),
        tokenInfo: TokenTypes.ETH,
    },    
    QI: {
        token: new Token(ChainId.Fantom, '0x68Aa691a8819B07988B18923F712F3f4C8d36346', 18, 'QI', 'Qi Dao'),
        tokenInfo: TokenTypes.QI,
    },
    HND: {
        token: new Token(ChainId.Fantom, '0x10010078a54396F62c96dF8532dc2B4847d47ED3', 18, 'HND', 'Hundred Finance'),
        tokenInfo: TokenTypes.HND,
    },
    BIFI: {
        token: new Token(ChainId.Fantom, '0xd6070ae98b8069de6b494332d1a1a81b6179d960', 18, 'BIFI', 'BIFI'),
        tokenInfo: TokenTypes.BIFI,
    },
    SYN: {
        token: new Token(ChainId.Fantom, '0xe55e19fb4f2d85af758950957714292dac1e25b2', 18, 'SYN', 'SYN'),
        tokenInfo: TokenTypes.SYN,
    },    
    SNX: {
        token: new Token(ChainId.Fantom, '0x56ee926bD8c72B2d5fa1aF4d9E4Cbb515a1E3Adc', 18, 'SNX', 'SNX'),
        tokenInfo: TokenTypes.SNX,
    },
    KNC: {
        token: new Token(ChainId.Fantom, '0x1e1085efaa63edfe74aad7c05a28eae4ef917c3f', 18, 'KNC', 'KNC'),
        tokenInfo: TokenTypes.KNC,
    },
};

export default fantom;