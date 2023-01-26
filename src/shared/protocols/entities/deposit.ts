import { BigNumber, ethers } from "ethers";
import { ChainId, getReadContract } from "../../chains";
import { TokenDetails } from "../../types/tokens";
import { Protocols, ProtocolTypes } from "../constants";

export abstract class DepositInfo {
    abi: Record<string, any>[];
    address: string;
    tokenDetails: TokenDetails;
    tokenDetailsRewards: TokenDetails;
    name: string;
    protocol: Protocols;
    type: ProtocolTypes;
    chainId: ChainId;
    poolInfo?: PoolInfoBase;

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

    abstract contract: ethers.Contract;
    abstract getDepositAmount(address: string): Promise<BigNumber>;
    abstract getRewardAmount(address: string): Promise<BigNumber>;
}

export enum PoolType {
    Regular,
    Arrakis
}

export abstract class PoolInfoBase {
    tokens: TokenDetails[];
    address: string;
    contract: ethers.Contract;
    chainId: ChainId;
    name?: string;

    constructor(
        tokens: TokenDetails[],
        address: string,
        chainId: ChainId,
        abi: Record<string, any>[],
    ) {
        this.tokens = tokens;
        this.address = address;
        this.chainId = chainId;
        this.contract = getReadContract(this.chainId, this.address, JSON.stringify(abi));
    }
}

export class PoolInfo extends PoolInfoBase {
    constructor(
        tokens: TokenDetails[],
        address: string,
        chainId: ChainId,
        abi: Record<string, any>[],
    ) {
        super(tokens, address, chainId, abi);
    }
}

export class ArrakisPoolInfo extends PoolInfoBase {
    constructor(
        tokens: TokenDetails[],
        address: string,
        chainId: ChainId,
        abi: Record<string, any>[],
    ) {
        super(tokens, address, chainId, abi);
    }
}