import { Token } from "@uniswap/sdk-core";
import { ChainId } from "../../../chains";
import { TokenTypes } from "../../../constants/token";

export const ThenaTokens = {
    sAMM_USDC_BUSD: {
        token: new Token(ChainId.BNB, '0x7e61c053527a7af0c700ad9d2c8207e386273222', 18, 'sAMM-USDC/BUSD', 'USDC+BUSD'),
        tokenInfo: TokenTypes.UNUSED,
    },
    sAMM_HAY_BUSD: {
        token: new Token(ChainId.BNB, '0x93b32a8dfe10e9196403dd111974e325219aec24', 18, 'sAMM-HAY/BUSD', 'HAY+BUSD'),
        tokenInfo: TokenTypes.UNUSED,
    },
    sAMM_MAI_BUSD: {
        token: new Token(ChainId.BNB, '0xe459556595a224d7f12b45e93138f4a1265ac618', 18, 'sAMM-MAI/BUSD', 'MAI+BUSD'),
        tokenInfo: TokenTypes.UNUSED,
    },
    vAMM_WBNB_THE: {
        token: new Token(ChainId.BNB, '0x63db6ba9e512186c2faadacef342fb4a40dc577c', 18, 'vAMM-WBNB/THE', 'WBNB+THE'),
        tokenInfo: TokenTypes.UNUSED,
    },
    vAMM_BUSD_THE: {
        token: new Token(ChainId.BNB, '0x34B897289fcCb43c048b2Cea6405e840a129E021', 18, 'vAMM-BUSD/THE', 'BUSD+THE'),
        tokenInfo: TokenTypes.UNUSED,
    },
    vAMM_DEI_BUSD: {
        token: new Token(ChainId.BNB, '0x06589AbD54582783142E3D1165722e7e10483De0', 18, 'sAMM-DEI/BUSD', 'DEI+BUSD'),
        tokenInfo: TokenTypes.UNUSED,
    },
    sAMM_IDIA_BUSD: {
        token: new Token(ChainId.BNB, '0x3c552e8aC4473222e3d794ADecFA432Eace85929', 18, 'sAMM-IDIA/BUSD', 'IDIA+BUSD'),
        tokenInfo: TokenTypes.UNUSED,
    },
}