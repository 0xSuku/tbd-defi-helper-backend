import { ethers } from "ethers"

export const RPC_ETHEREUM = "https://eth-mainnet.g.alchemy.com/v2/fGd5ch2Rr-xB7UX8JWBmFGqqFpSP3Flk"
export const RPC_POLYGON = "https://polygon-rpc.com"
export const RPC_BSC = "https://bsc-dataseed1.binance.org/"
export const RPC_HECO = "https://http-mainnet.hecochain.com"
export const RPC_MILK = "https://rpc-mainnet-cardano-evm.c1.milkomeda.com"
export const RPC_FTM = "https://rpc.ftm.tools/"
export const RPC_GNOSIS = "https://rpc.ankr.com/gnosis"
export const RPC_AVALANCHE = "https://api.avax.network/ext/bc/C/rpc"
export const RPC_OPTIMISM = "https://opt-mainnet.g.alchemy.com/v2/7IVenVkZ0s_GxdG5A50n53VQldHtRdQV"
export const RPC_ARBITRUM = "https://arb1.arbitrum.io/rpc"

export enum ChainId {
    Ethereum = 1,
    Polygon = 137,
    Fantom = 250,
}

export function getProvider(chainId: ChainId) {
    switch (chainId) {
        case ChainId.Polygon:
            return ethers.providers.getDefaultProvider(RPC_POLYGON);
        case ChainId.Ethereum:
            return ethers.providers.getDefaultProvider(RPC_ETHEREUM);
        case ChainId.Fantom:
            return ethers.providers.getDefaultProvider(RPC_FTM);
        default:
            return ethers.providers.getDefaultProvider(RPC_ETHEREUM);
    }
}

export function getReadContract(chainId: ChainId, address: string, abi: string) {
    const provider = getProvider(chainId);
    return new ethers.Contract(address, abi, provider);
}