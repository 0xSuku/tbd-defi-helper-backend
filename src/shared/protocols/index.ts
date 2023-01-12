import { ChainId } from "../chains";
import { Protocol } from "../types/protocols";
import { Protocols } from "./constants";

const protocolList: Protocol[] = [
    {
        symbol: Protocols.Qi_Dao,
        name: 'Qi Dao',
        chainId: ChainId.Polygon,
        info: []
    }, {
        symbol: Protocols.Mummy,
        name: 'Mummy Finance',
        chainId: ChainId.Fantom,
        info: []
    }, {
        symbol: Protocols.GMX,
        name: 'GMX',
        chainId: ChainId.Arbitrum,
        info: []
    }
];
export default protocolList;