import { BigNumber, ethers } from "ethers";
import { ChainId, getReadContract } from "../../chains";
import { Tokens } from "../../tokens";
import { TokenDetails } from "../../types/tokens";
import { Protocols, ProtocolTypes } from "../constants";
import { rewardTrackerABI, stakerABI, vesterABI } from "../gmx-forks/gmx-abis";
import { DepositInfo, PoolInfo } from "./deposit";

export class GmxStakeDepositInfoBase extends DepositInfo {
    contract: ethers.Contract;
    stakeFeesContract: ethers.Contract;
    tokenFeeRewards: TokenDetails;
    feeStakeTokenAddress: string;
    poolInfo?: PoolInfo;

    constructor(
        name: string,
        protocol: Protocols,
        chainId: ChainId,
        tokenDetailsStake: TokenDetails,
        tokenDetailsRewards: TokenDetails,
        tokenDetailsFeeRewards: TokenDetails,
        feeStakeTokenAddress: string,
        poolInfo?: PoolInfo,
    ) {
        super(stakerABI, tokenDetailsStake.token.address, tokenDetailsStake, tokenDetailsRewards, name, protocol, ProtocolTypes.Staking, chainId);

        this.tokenFeeRewards = tokenDetailsFeeRewards;
        this.feeStakeTokenAddress = feeStakeTokenAddress;
        this.contract = getReadContract(this.chainId, this.address, JSON.stringify(this.abi));
        this.stakeFeesContract = getReadContract(this.chainId, this.feeStakeTokenAddress, JSON.stringify(rewardTrackerABI));
        this.poolInfo = poolInfo;
    }

    async getDepositAmount(address: string): Promise<BigNumber> {
        return await this.contract.stakedAmounts(address);
    }

    async getRewardAmount(address: string): Promise<BigNumber> {
        return await this.contract.claimable(address);
    }

    async getRewardFeesAmount(address: string): Promise<BigNumber> {
        return await this.stakeFeesContract.claimable(address);
    }
}

export class GmxStakeDepositInfo extends GmxStakeDepositInfoBase {
    constructor(
        name: string,
        tokenDetailsStake: TokenDetails,
        feeStakeTokenAddress: string,
        defiLlamaId: string,
        poolInfo?: PoolInfo,
    ) {
        super(name, Protocols.GMX, ChainId.Arbitrum, tokenDetailsStake, Tokens.arbitrum.GMX, Tokens.arbitrum.WETH, feeStakeTokenAddress, poolInfo);
        this.defiLlamaId = defiLlamaId;
    }
}

export class MummyStakeDepositInfo extends GmxStakeDepositInfoBase {
    constructor(
        name: string,
        tokenDetailsStake: TokenDetails,
        feeStakeTokenAddress: string,
        poolInfo?: PoolInfo,
    ) {
        super(name, Protocols.Mummy, ChainId.Fantom, tokenDetailsStake, Tokens.fantom.MMY, Tokens.fantom.WFTM, feeStakeTokenAddress, poolInfo);
    }
}

export class BaymaxStakeDepositInfo extends GmxStakeDepositInfoBase {
    constructor(
        name: string,
        tokenDetailsStake: TokenDetails,
        feeStakeTokenAddress: string,
        poolInfo?: PoolInfo,
    ) {
        super(name, Protocols.BAYMAX, ChainId.Avalanche, tokenDetailsStake, Tokens.avalanche.BAY, Tokens.avalanche.WAVAX, feeStakeTokenAddress, poolInfo);
    }
}

export class GmxVestDepositInfoBase extends DepositInfo {
    contract: ethers.Contract;

    constructor(
        name: string,
        protocol: Protocols,
        chainId: ChainId,
        tokenDetailsVest: TokenDetails,
        tokenDetailsRewards: TokenDetails
    ) {
        super(vesterABI, tokenDetailsVest.token.address, tokenDetailsVest, tokenDetailsRewards, name, protocol, ProtocolTypes.Vesting, chainId);
        this.contract = getReadContract(this.chainId, this.address, JSON.stringify(vesterABI));
    }

    async getDepositAmount(address: string): Promise<BigNumber> {
        return await this.contract.balanceOf(address);
    }

    async getRewardAmount(address: string): Promise<BigNumber> {
        return await this.contract.claimable(address);
    }
}

export class GmxVestDepositInfo extends GmxVestDepositInfoBase {
    constructor(
        name: string,
        tokenDetailsVest: TokenDetails,
    ) {
        super(name, Protocols.GMX, ChainId.Arbitrum, tokenDetailsVest, Tokens.arbitrum.GMX);
    }
}

export class MummyVestDepositInfo extends GmxVestDepositInfoBase {
    constructor(
        name: string,
        tokenDetailsVest: TokenDetails,
    ) {
        super(name, Protocols.Mummy, ChainId.Fantom, tokenDetailsVest, Tokens.fantom.MMY);
    }
}

export class BaymaxVestDepositInfo extends GmxVestDepositInfoBase {
    constructor(
        name: string,
        tokenDetailsVest: TokenDetails,
    ) {
        super(name, Protocols.BAYMAX, ChainId.Avalanche, tokenDetailsVest, Tokens.avalanche.BAY);
    }
}