import { ethers } from "ethers";
import 'dotenv/config'

const RPC_ETHEREUM = process.env.RPC_ETHEREUM as string;
const RPC_POLYGON = process.env.RPC_POLYGON as string;
const RPC_BSC = process.env.RPC_BSC as string;
const RPC_GNOSIS = process.env.RPC_GNOSIS as string;
const RPC_MILKOMEDA = process.env.RPC_MILKOMEDA as string;
const RPC_FTM = process.env.RPC_FTM as string;
const RPC_AVALANCHE = process.env.RPC_AVALANCHE as string;
const RPC_OPTIMISM = process.env.RPC_OPTIMISM as string;
const RPC_ARBITRUM = process.env.RPC_ARBITRUM as string;
const RPC_METIS = process.env.RPC_METIS as string;

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