import { BigNumber, ethers } from "ethers";
import { ChainId, getReadContract } from "../../chains";
import { TokenDetails } from "../../types/tokens";
import { Protocols, ProtocolTypes } from "../constants";
import { DepositInfo, PoolInfo } from "./deposit";
import { gaugeV2ABI } from "../solidly-forks/solidly-abis";
import { Tokens } from "../../tokens";

export class SolidlyGaugeV2DepositInfoBase extends DepositInfo {
    contract: ethers.Contract;
    poolInfo: PoolInfo;

    constructor(
        name: string,
        protocol: Protocols,
        chainId: ChainId,
        contractAddress: string,
        tokenDetailsVault: TokenDetails,
        tokenDetailsRewards: TokenDetails,
        poolInfo: PoolInfo,
    ) {
        super(gaugeV2ABI, contractAddress, tokenDetailsVault, tokenDetailsRewards, name, protocol, ProtocolTypes.Farms, chainId);

        this.contract = getReadContract(this.chainId, this.address, JSON.stringify(this.abi));
        this.poolInfo = poolInfo;
    }

    async getDepositAmount(address: string): Promise<BigNumber> {
        return await this.contract.balanceOf(address);
    }

    async getRewardAmount(address: string): Promise<BigNumber> {
        return await this.contract.earned(address);
    }
}

export class ThenaGaugeV2DepositInfo extends SolidlyGaugeV2DepositInfoBase {
    constructor(
        name: string,
        contractAddress: string,
        tokenDetailsVault: TokenDetails,
        poolInfo: PoolInfo,
    ) {
        super(name, Protocols.Thena, ChainId.BNB, contractAddress, tokenDetailsVault, Tokens.bnb.THE, poolInfo);
    }
}