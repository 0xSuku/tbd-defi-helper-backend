import { Token } from "@uniswap/sdk-core";
import { TokenInfo } from "../types/tokens";
import { ChainId } from "../chains";
import { TokenTypes } from "../constants/token";

const bnb: TokenInfo = {
    USDT: {
        token: new Token(ChainId.BNB, '0x55d398326f99059ff775485246999027b3197955', 18, 'USDT', 'USDT'),
        tokenInfo: TokenTypes.USDT,
    },
    USDC: {
        token: new Token(ChainId.BNB, '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', 18, 'USDC', 'USDC'),
        tokenInfo: TokenTypes.USDC,
    },
    DAI: {
        token: new Token(ChainId.BNB, '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', 18, 'DAI', 'DAI'),
        tokenInfo: TokenTypes.DAI,
    },
    BUSD: {
        token: new Token(ChainId.BNB, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18, 'BUSD', 'BUSD'),
        tokenInfo: TokenTypes.BUSD,
    },
    WBNB: {
        token: new Token(ChainId.BNB, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'WBNB'),
        tokenInfo: TokenTypes.BNB,
    },
    WETH: {
        token: new Token(ChainId.BNB, '0x2170ed0880ac9a755fd29b2688956bd959f933f8', 18, 'WETH', 'WETH'),
        tokenInfo: TokenTypes.ETH,
    },
    BIFI: {
        token: new Token(ChainId.BNB, '0xCa3F508B8e4Dd382eE878A314789373D80A5190A', 18, 'BIFI', 'BIFI'),
        tokenInfo: TokenTypes.BIFI,
    },
    SYN: {
        token: new Token(ChainId.BNB, '0xa4080f1778e69467e905b8d6f72f6e441f9e9484', 18, 'SYN', 'SYN'),
        tokenInfo: TokenTypes.SYN,
    },
    FTM: {
        token: new Token(ChainId.BNB, '0xad29abb318791d579433d831ed122afeaf29dcfe', 18, 'FTM', 'FTM'),
        tokenInfo: TokenTypes.FTM,
    },
    ADA: {
        token: new Token(ChainId.BNB, '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47', 18, 'ADA', 'ADA'),
        tokenInfo: TokenTypes.ADA,
    },
    SNX: {
        token: new Token(ChainId.BNB, '0x9ac983826058b8a9c7aa1c9171441191232e8404', 18, 'SNX', 'SNX'),
        tokenInfo: TokenTypes.SNX,
    },
    KNC: {
        token: new Token(ChainId.BNB, '0xfe56d5892bdffc7bf58f2e84be1b2c32d21c308b', 18, 'KNC', 'KNC'),
        tokenInfo: TokenTypes.KNC,
    },
    THE: {
        token: new Token(ChainId.BNB, '0xf4c8e32eadec4bfe97e0f595add0f4450a863a11', 18, 'THE', 'THENA'),
        tokenInfo: TokenTypes.THE,
    },
    HAY: {
        token: new Token(ChainId.BNB, '0x0782b6d8c4551b9760e74c0545a9bcd90bdc41e5', 18, 'HAY', 'HAY'),
        tokenInfo: TokenTypes.HAY,
    },
    MAI: {
        token: new Token(ChainId.BNB, '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d', 18, 'MAI', 'MAI'),
        tokenInfo: TokenTypes.MAI,
    },
    IDIA: {
        token: new Token(ChainId.BNB, '0x0b15Ddf19D47E6a86A56148fb4aFFFc6929BcB89', 18, 'IDIA', 'IDIA'),
        tokenInfo: TokenTypes.IDIA,
    },
    DEI: {
        token: new Token(ChainId.BNB, '0xDE1E704dae0B4051e80DAbB26ab6ad6c12262DA0', 18, 'DEI', 'DEI'),
        tokenInfo: TokenTypes.DEI,
    },
};

export default bnb;