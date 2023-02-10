import { ChainId } from "../chains";
import { Protocol } from "../types/protocols";
import { Protocols } from "./constants";

export const protocolList: Protocol[] = [
    {
        symbol: Protocols.Qi_Dao,
        name: 'Qi Dao',
        chainId: ChainId.Polygon,
        info: [],
        usdValue: 0
    }, {
        symbol: Protocols.Mummy,
        name: 'Mummy Finance',
        chainId: ChainId.Fantom,
        info: [],
        usdValue: 0
    }, {
        symbol: Protocols.GMX,
        name: 'GMX',
        chainId: ChainId.Arbitrum,
        info: [],
        usdValue: 0
    }, {
        symbol: Protocols.BAYMAX,
        name: 'BAYMAX',
        chainId: ChainId.Avalanche,
        info: [],
        usdValue: 0
    }, {
        symbol: Protocols.Thena,
        name: 'Thena',
        chainId: ChainId.BNB,
        info: [],
        usdValue: 0
    }, {
        symbol: Protocols.UniswapV3,
        name: 'Uniswap V3',
        chainId: ChainId.Arbitrum,
        info: [],
        usdValue: 0
    }
];
