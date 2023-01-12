import { Token } from "@uniswap/sdk-core";
import { TokenInfo } from "../types/tokens";
import { ChainId } from "../chains";
import { TokenTypes } from "../constants/token";

const avalanche: TokenInfo = {
    WAVAX: {
        token: new Token(ChainId.Avalanche, '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 18, 'WAVAX', 'WAVAX'),
        tokenInfo: TokenTypes.AVAX,
    },
    USDC: {
        token: new Token(ChainId.Avalanche, '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', 6, 'USDC', 'USDC'),
        tokenInfo: TokenTypes.USDC,
    },
    QI: {
        token: new Token(ChainId.Avalanche, '0xA56F9A54880afBc30CF29bB66d2D9ADCdcaEaDD6', 18, 'QI', 'QI'),
        tokenInfo: TokenTypes.QI,
    },    
    BIFI: {
        token: new Token(ChainId.Avalanche, '0xd6070ae98b8069de6B494332d1A1a81B6179D960', 18, 'BIFI', 'BIFI'),
        tokenInfo: TokenTypes.BIFI,
    },
    SYN: {
        token: new Token(ChainId.Avalanche, '0x1f1e7c893855525b303f99bdf5c3c05be09ca251', 18, 'SYN', 'SYN'),
        tokenInfo: TokenTypes.SYN,
    },
    KNC: {
        token: new Token(ChainId.Avalanche, '0x39fc9e94caeacb435842fadedecb783589f50f5f', 18, 'KNC', 'KNC'),
        tokenInfo: TokenTypes.KNC,
    },
};

export default avalanche;