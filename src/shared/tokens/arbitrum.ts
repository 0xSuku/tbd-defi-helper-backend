import { Token } from "@uniswap/sdk-core";
import { TokenInfo } from "../types/tokens";
import { ChainId } from "../chains";
import { TokenTypes } from "../constants/token";

const arbitrum: TokenInfo = {
    QI: {
        token: new Token(ChainId.Arbitrum, '0xB9C8F0d3254007eE4b98970b94544e473Cd610EC', 18, 'QI', 'Qi DAO'),
        tokenInfo: TokenTypes.QI,
    },
    USDC: {
        token: new Token(ChainId.Arbitrum, '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', 6, 'USDC', 'USDC'),
        tokenInfo: TokenTypes.USDC,
    },
    GLP: {
        token: new Token(ChainId.Arbitrum, '0x4277f8f2c384827b5273592ff7cebd9f2c1ac258', 18, 'GLP', 'GLP'),
        tokenInfo: TokenTypes.UNUSED,
        disabled: true,
    },
    BIFI: {
        token: new Token(ChainId.Arbitrum, '0x99c409e5f62e4bd2ac142f17cafb6810b8f0baae', 18, 'BIFI', 'BIFI'),
        tokenInfo: TokenTypes.BIFI,
    },
    SYN: {
        token: new Token(ChainId.Arbitrum, '0x080F6AEd32Fc474DD5717105Dba5ea57268F46eb', 18, 'SYN', 'SYN'),
        tokenInfo: TokenTypes.SYN,
    },
    GMX: {
        token: new Token(ChainId.Arbitrum, '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a', 18, 'GMX', 'GMX'),
        tokenInfo: TokenTypes.GMX,
    },
    esGMX: {
        token: new Token(ChainId.Arbitrum, '0xf42ae1d54fd613c9bb14810b0588faaa09a426ca', 18, 'esGMX', 'esGMX'),
        tokenInfo: TokenTypes.esGMX,
    },
    sGMX: {
        token: new Token(ChainId.Arbitrum, '0x908C4D94D34924765f1eDc22A1DD098397c59dD4', 18, 'sGMX', 'Staked GMX'),
        tokenInfo: TokenTypes.GMX,
        disabled: true,
    },
    fsGLP: {
        token: new Token(ChainId.Arbitrum, '0x1aDDD80E6039594eE970E5872D247bf0414C8903', 18, 'fsGLP', 'Staked GLP'),
        tokenInfo: TokenTypes.UNUSED,
        disabled: true,
    },
    fGLP: {
        token: new Token(ChainId.Arbitrum, '0x4e971a87900b931fF39d1Aad67697F49835400b6', 18, 'fsGLP', 'Staked GLP'),
        tokenInfo: TokenTypes.UNUSED,
        disabled: true,
    },
    vGMX: {
        token: new Token(ChainId.Arbitrum, '0x199070DDfd1CFb69173aa2F7e20906F26B363004', 18, 'vGMX', 'Vested GMX'),
        tokenInfo: TokenTypes.GMX,
        disabled: true,
    },
    vGLP: {
        token: new Token(ChainId.Arbitrum, '0xA75287d2f8b217273E7FCD7E86eF07D33972042E', 18, 'vGLP', 'Vested GLP'),
        tokenInfo: TokenTypes.UNUSED,
        disabled: true,
    },
    WETH: {
        token: new Token(ChainId.Arbitrum, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', 18, 'WETH', 'WETH'),
        tokenInfo: TokenTypes.ETH,
    },
};

export default arbitrum;