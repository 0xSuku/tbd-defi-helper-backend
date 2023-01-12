import { ethers } from "ethers"

export const RPC_ETHEREUM = "https://eth-mainnet.g.alchemy.com/v2/fGd5ch2Rr-xB7UX8JWBmFGqqFpSP3Flk"
export const RPC_POLYGON = "https://polygon-rpc.com"
export const RPC_BSC = "https://bsc-dataseed1.binance.org/"
export const RPC_HECO = "https://http-mainnet.hecochain.com"
export const RPC_MILKOMEDA = "https://rpc-mainnet-cardano-evm.c1.milkomeda.com"
export const RPC_FTM = "https://rpc.ftm.tools/"
export const RPC_GNOSIS = "https://rpc.ankr.com/gnosis"
export const RPC_AVALANCHE = "https://api.avax.network/ext/bc/C/rpc"
export const RPC_OPTIMISM = "https://opt-mainnet.g.alchemy.com/v2/7IVenVkZ0s_GxdG5A50n53VQldHtRdQV"
export const RPC_ARBITRUM = "https://arb1.arbitrum.io/rpc"
export const RPC_METIS = "https://andromeda.metis.io/?owner=1088"

export enum ChainId {
    Ethereum = 1,
    Optimism = 10,
    BNB = 56,
    Gnosis = 100,
    Polygon = 137,
    Fantom = 250,
    Metis = 1088,
    Milkomeda = 2001,
    Arbitrum = 42161,
    Avalanche = 43114,
}

export function getProvider(chainId: ChainId) {
    switch (chainId) {
        case ChainId.Ethereum:
            return ethers.providers.getDefaultProvider(RPC_ETHEREUM);
        case ChainId.Optimism:
            return ethers.providers.getDefaultProvider(RPC_OPTIMISM);
        case ChainId.BNB:
            return ethers.providers.getDefaultProvider(RPC_BSC);
        case ChainId.Gnosis:
            return ethers.providers.getDefaultProvider(RPC_GNOSIS);
        case ChainId.Polygon:
            return ethers.providers.getDefaultProvider(RPC_POLYGON);
        case ChainId.Fantom:
            return ethers.providers.getDefaultProvider(RPC_FTM);
        case ChainId.Metis:
            return ethers.providers.getDefaultProvider(RPC_METIS);
        case ChainId.Milkomeda:
            return ethers.providers.getDefaultProvider(RPC_MILKOMEDA);
        case ChainId.Arbitrum:
            return ethers.providers.getDefaultProvider(RPC_ARBITRUM);
        case ChainId.Avalanche:
            return ethers.providers.getDefaultProvider(RPC_AVALANCHE);
        default:
            throw new Error('Provider not implemented');
    }
}

export function getReadContract(chainId: ChainId, address: string, abi: string) {
    const provider = getProvider(chainId);
    return new ethers.Contract(address, abi, provider);
}

export async function getWriteContract(chainId: ChainId, address: string, abi: string) {
    const _window = window as any;
    if (!_window.ethereum) return null;

    if (_window.ethereum.chainId !== chainId) {
        await _window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x' + chainId.toString(16) }],
        });
    }
    const provider = new ethers.providers.Web3Provider(_window.ethereum);
    return new ethers.Contract(address, abi, provider.getSigner());
}