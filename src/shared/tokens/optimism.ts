import { Token } from "@uniswap/sdk-core";
import { TokenInfo } from "../types/tokens";
import { ChainId } from "../chains";
import { TokenTypes } from "../constants/token";

const optimism: TokenInfo = {
    WBTC: {
        token: new Token(ChainId.Optimism, '0x68f180fcce6836688e9084f035309e29bf0a2095', 18, 'WBTC', 'WBTC'),
        tokenInfo: TokenTypes.BTC,
    },
    USDC: {
        token: new Token(ChainId.Optimism, '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', 6, 'USDC', 'USDC'),
        tokenInfo: TokenTypes.USDC,
    },
    WETH: {
        token: new Token(ChainId.Optimism, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'WETH'),
        tokenInfo: TokenTypes.ETH,
    },
    QI: {
        token: new Token(ChainId.Optimism, '0x3f56e0c36d275367b8c502090edf38289b3dea0d', 18, 'QI', 'QI'),
        tokenInfo: TokenTypes.QI,
    },
    HND: {
        token: new Token(ChainId.Optimism, '0x10010078a54396F62c96dF8532dc2B4847d47ED3', 18, 'HND', 'HND'),
        tokenInfo: TokenTypes.HND,
    },
    CRV: {
        token: new Token(ChainId.Optimism, '0x0994206dfE8De6Ec6920FF4D779B0d950605Fb53', 18, 'CRV', 'CRV'),
        tokenInfo: TokenTypes.CRV,
    },
    SNX: {
        token: new Token(ChainId.Optimism, '0x8700daec35af8ff88c16bdf0418774cb3d7599b4', 18, 'SNX', 'SNX'),
        tokenInfo: TokenTypes.SNX,
    },
    KNC: {
        token: new Token(ChainId.Optimism, '0xa00e3a3511aac35ca78530c85007afcd31753819', 18, 'KNC', 'KNC'),
        tokenInfo: TokenTypes.KNC,
    },
    KNC_2: {
        token: new Token(ChainId.Optimism, '0x4518231a8fdf6ac553b9bbd51bbb86825b583263', 18, 'mKNC', 'mKNC'),
        tokenInfo: TokenTypes.KNC,
    },
    USDPLUS: {
        token: new Token(ChainId.Optimism, '0x73cb180bf0521828d8849bc8CF2B920918e23032', 6, 'USD+', 'USD+'),
        tokenInfo: TokenTypes.USDPLUS,
    },
    OP: {
        token: new Token(ChainId.Optimism, '0x4200000000000000000000000000000000000042', 18, 'OP', 'OP'),
        tokenInfo: TokenTypes.OP,
    },
};

export default optimism;