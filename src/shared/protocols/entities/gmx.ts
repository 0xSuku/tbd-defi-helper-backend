import { ChainId } from "../../chains";
import { TokenDetails } from "../../types/tokens";
import { stakerABI, vesterABI } from "./gmx-abis";
import { Protocols, ProtocolTypes } from "../constants";
import { DepositInfo } from "./deposit";

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
        super(vesterABI, p.tokenDetailsVest.token.address, p.tokenDetailsVest, p.tokenDetailsRewards, p.name, p.protocol, ProtocolTypes.Vesting, p.chainId);
    }
}