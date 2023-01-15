import { ChainId } from "../../chains";
import { TokenDetails } from "../../types/tokens";
import { stakerABI, vesterABI } from "../abi/base/gmx-abis";
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

export class GmxStakeDepositInfo extends DepositInfo {
    constructor(p: {
        name: string,
        protocol: Protocols,
        chainId: ChainId,
        tokenDetailsStake: TokenDetails,
        tokenDetailsRewards: TokenDetails,
        tokenDetailsFeeRewards: TokenDetails,
        feeStakeTokenAddress: string,
    }) {
        super(stakerABI, p.tokenDetailsStake.token.address, p.tokenDetailsStake, p.tokenDetailsRewards, p.name, p.protocol, ProtocolTypes.Staking, p.chainId);

        this.tokenFeeRewards = p.tokenDetailsFeeRewards;
        this.feeStakeTokenAddress = p.feeStakeTokenAddress;
    }

    tokenFeeRewards: TokenDetails;
    feeStakeTokenAddress: string;
}

export class GmxVestDepositInfo extends DepositInfo {
    constructor(p: {
        name: string,
        protocol: Protocols,
        chainId: ChainId,
        tokenDetailsVest: TokenDetails,
        tokenDetailsRewards: TokenDetails
    }) {
        super(vesterABI, p.tokenDetailsVest.token.address, p.tokenDetailsVest, p.tokenDetailsRewards, p.name, p.protocol, ProtocolTypes.Staking, p.chainId);
    }
}