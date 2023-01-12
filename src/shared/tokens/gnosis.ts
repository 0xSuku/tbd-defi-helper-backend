import { Token } from "@uniswap/sdk-core";
import { TokenInfo } from "../types/tokens";
import { ChainId } from "../chains";
import { TokenTypes } from "../constants/token";

const gnosis: TokenInfo = {
    WETH: {
        token: new Token(ChainId.Gnosis, '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1', 18, 'WETH', 'WETH'),
        tokenInfo: TokenTypes.ETH,
    },
    USDC: {
        token: new Token(ChainId.Gnosis, '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83', 6, 'USDC', 'USDC'),
        tokenInfo: TokenTypes.USDC,
    },
    MAI: {
        token: new Token(ChainId.Gnosis, '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d', 18, 'MAI', 'MAI'),
        tokenInfo: TokenTypes.MAI,
    },
    GNO: {
        token: new Token(ChainId.Gnosis, '0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb', 18, 'GNO', 'GNO'),
        tokenInfo: TokenTypes.GNO,
    },
    CRV: {
        token: new Token(ChainId.Gnosis, '0x712b3d230F3C1c19db860d80619288b1F0BDd0Bd', 18, 'CRV', 'CRV'),
        tokenInfo: TokenTypes.CRV,
    },
    WXDAI: {
        token: new Token(ChainId.Gnosis, '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d', 18, 'WXDAI', 'WXDAI'),
        tokenInfo: TokenTypes.DAI,
    },
    DHV: {
        token: new Token(ChainId.Gnosis, '0xFbdd194376de19a88118e84E279b977f165d01b8', 18, 'DHV', 'DHV'),
        tokenInfo: TokenTypes.DHV,
    },
    QI: {
        token: new Token(ChainId.Gnosis, '0xdfa46478f9e5ea86d57387849598dbfb2e964b02', 18, 'QI', 'QI'),
        tokenInfo: TokenTypes.QI,
    },
    HND: {
        token: new Token(ChainId.Gnosis, '0x10010078a54396F62c96dF8532dc2B4847d47ED3', 18, 'HND', 'HND'),
        tokenInfo: TokenTypes.HND,
    },
};

export default gnosis;