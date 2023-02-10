import { Token } from "@uniswap/sdk-core";
import { TokenInfo } from "../types/tokens";
import { ChainId } from "../chains";
import { TokenTypes } from "../constants/token";

const avalanche: TokenInfo = {
    WAVAX: {
        token: new Token(ChainId.Avalanche, '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7', 18, 'WAVAX', 'WAVAX'),
        tokenInfo: TokenTypes.AVAX,
    },
    USDCe: {
        token: new Token(ChainId.Avalanche, '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', 6, 'USDC.e', 'USDC.e'),
        tokenInfo: TokenTypes.USDC,
    },
    USDC: {
        token: new Token(ChainId.Avalanche, '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e', 6, 'USDC', 'USDC'),
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
    WETHe: {
        token: new Token(ChainId.Avalanche, '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab', 18, 'WETH.e', 'WETH.e'),
        tokenInfo: TokenTypes.ETH,
    },
    WBTCe: {
        token: new Token(ChainId.Avalanche, '0x50b7545627a5162f82a992c33b87adc75187b218', 18, 'WBTC.e', 'WBTC.e'),
        tokenInfo: TokenTypes.BTC,
    },
    BTCb: {
        token: new Token(ChainId.Avalanche, '0x152b9d0FdC40C096757F570A51E494bd4b943E50', 18, 'BTC.b', 'BTC.b'),
        tokenInfo: TokenTypes.BTC,
    },    
    sBAY: {
        token: new Token(ChainId.Avalanche, '0x42526faaf9400c08da7ce713388eed29273d65de', 18, 'sBAY', 'sBAY'),
        tokenInfo: TokenTypes.BAY,
        disabled: true,
    },
    fsBLP: {
        token: new Token(ChainId.Avalanche, '0xba4f83989aed9456114cb452f29171abff92cf8a', 18, 'fsMLP', 'fsMLP'),
        tokenInfo: TokenTypes.UNUSED,
        disabled: true,
    },
    vBLP: {
        token: new Token(ChainId.Avalanche, '0x6eb172e6d04267fd949955251e730bb966ed121b', 18, 'vMLP', 'vMLP'),
        tokenInfo: TokenTypes.UNUSED,
        disabled: true,
    },
    vBAY: {
        token: new Token(ChainId.Avalanche, '0x8c8fc4552dcd0585aee8d1ec6203a73184916982', 18, 'vMMY', 'vMMY'),
        tokenInfo: TokenTypes.BAY,
        disabled: true,
    },
    BLP: {
        token: new Token(ChainId.Avalanche, '0xb6766db0768b10d74e7a3248ca8fcf760ab952c2', 18, 'BLP', 'BLP'),
        tokenInfo: TokenTypes.UNUSED,
        disabled: true,
    },
    BAY: {
        token: new Token(ChainId.Avalanche, '0x18706c65b12595edb43643214eacdb4f618dd166', 18, 'BAY', 'BAY'),
        tokenInfo: TokenTypes.BAY,
        disabled: true,
    },
};

export default avalanche;