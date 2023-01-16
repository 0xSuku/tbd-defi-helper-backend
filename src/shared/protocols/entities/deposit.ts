import { ChainId } from "../../chains";
import { TokenDetails } from "../../types/tokens";
import { Protocols, ProtocolTypes } from "../constants";

export abstract class DepositInfo {
    constructor(
        abi: Record<string, any>[],
        address: string,
        token: TokenDetails,
        tokenRewards: TokenDetails,
        name: string,
        protocol: Protocols,
        type: ProtocolTypes,
        chainId: ChainId,
    ) {
        this.abi = abi;
        this.address = address;
        this.tokenDetails = token;
        this.tokenDetailsRewards = tokenRewards;
        this.name = name;
        this.protocol = protocol;
        this.type = type;
        this.chainId = chainId;
    }
    abi: Record<string, any>[];
    address: string;
    tokenDetails: TokenDetails;
    tokenDetailsRewards: TokenDetails;
    name: string;
    protocol: Protocols;
    type: ProtocolTypes;
    chainId: ChainId;
}