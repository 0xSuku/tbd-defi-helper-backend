import { Token } from "@uniswap/sdk-core";
import { ChainId } from "../chains";
import { TokenTypes } from "../constants/token";
import { TokenInfo } from "../types/tokens";

const polygon: TokenInfo = {
    QI: {
        token: new Token(ChainId.Polygon, '0x580a84c73811e1839f75d86d75d88cca0c241ff4', 18, 'QI', 'Qi DAO'),
        tokenInfo: TokenTypes.QI,
    },
    DHV: {
        token: new Token(ChainId.Polygon, '0x5fCB9de282Af6122ce3518CDe28B7089c9F97b26', 18, 'DHV', 'DHV'),
        tokenInfo: TokenTypes.DHV,
    },
    USDC: {
        token: new Token(ChainId.Polygon, '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', 6, 'USDC', 'USDC'),
        tokenInfo: TokenTypes.USDC,
    },
    WBNB: {
        token: new Token(ChainId.Polygon, '0x7e9928aFe96FefB820b85B4CE6597B8F660Fe4F4', 18, 'WBNB', 'WBNB'),
        tokenInfo: TokenTypes.BNB,
    },
    DAI: {
        token: new Token(ChainId.Polygon, '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', 18, 'DAI', 'DAI'),
        tokenInfo: TokenTypes.DAI,
    },
    USDT: {
        token: new Token(ChainId.Polygon, '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', 18, 'USDT', 'USDT'),
        tokenInfo: TokenTypes.USDT,
    },
    WETH: {
        token: new Token(ChainId.Polygon, '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619', 18, 'WETH', 'WETH'),
        tokenInfo: TokenTypes.ETH,
    },
    WMATIC: {
        token: new Token(ChainId.Polygon, '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', 18, 'WMATIC', 'WMATIC'),
        tokenInfo: TokenTypes.DHV,
    },
    BUSD: {
        token: new Token(ChainId.Polygon, '0x9fb83c0635de2e815fd1c21b3a292277540c2e8d', 18, 'BUSD', 'BUSD'),
        tokenInfo: TokenTypes.BUSD,
    },
    MAI: {
        token: new Token(ChainId.Polygon, '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1', 18, 'MAI', 'MAI'),
        tokenInfo: TokenTypes.MAI,
    },
    WBTC: {
        token: new Token(ChainId.Polygon, '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6', 18, 'WBTC', 'WBTC'),
        tokenInfo: TokenTypes.BTC,
    },
    QUICK: {
        token: new Token(ChainId.Polygon, '0x831753dd7087cac61ab5644b308642cc1c33dc13', 18, 'QUICK', 'QUICK'),
        tokenInfo: TokenTypes.QUICK,
    },
    HND: {
        token: new Token(ChainId.Polygon, '0x10010078a54396F62c96dF8532dc2B4847d47ED3', 18, 'HND', 'HND'),
        tokenInfo: TokenTypes.HND,
    },

    CRV: {
        token: new Token(ChainId.Polygon, '0x172370d5Cd63279eFa6d502DAB29171933a610AF', 18, 'CRV', 'CRV'),
        tokenInfo: TokenTypes.CRV,
    },
    BIFI: {
        token: new Token(ChainId.Polygon, '0xFbdd194376de19a88118e84E279b977f165d01b8', 18, 'BIFI', 'BIFI'),
        tokenInfo: TokenTypes.BIFI,
    },
    SYN: {
        token: new Token(ChainId.Polygon, '0xf8f9efc0db77d8881500bb06ff5d6abc3070e695', 18, 'SYN', 'SYN'),
        tokenInfo: TokenTypes.SYN,
    },
    AVAX: {
        token: new Token(ChainId.Polygon, '0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b', 18, 'AVAX', 'AVAX'),
        tokenInfo: TokenTypes.AVAX,
    },
    SNX: {
        token: new Token(ChainId.Polygon, '0x50b728d8d964fd00c2d0aad81718b71311fef68a', 18, 'SNX', 'SNX'),
        tokenInfo: TokenTypes.SNX,
    },
    KNC: {
        token: new Token(ChainId.Polygon, '0x1c954e8fe737f99f68fa1ccda3e51ebdb291948c', 18, 'KNC', 'KNC'),
        tokenInfo: TokenTypes.KNC,
    },
};

export default polygon;