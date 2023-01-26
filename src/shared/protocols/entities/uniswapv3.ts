import { BigNumber, ethers } from "ethers";
import { ChainId, getReadContract } from "../../chains";
import { TokenDetails } from "../../types/tokens";
import { Protocols, ProtocolTypes } from "../constants";
import { DepositInfo, PoolInfo } from "./deposit";
import { Tokens } from "../../tokens";
import { uniswapV3PoolABI } from "../uniswapv3/uniswapv3-abis";

export class UniswapV3DepositInfoBase extends DepositInfo {
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
        super(uniswapV3PoolABI, contractAddress, tokenDetailsVault, tokenDetailsRewards, name, protocol, ProtocolTypes.Farms, chainId);

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

export class UniswapV3DepositInfo extends UniswapV3DepositInfoBase {
    constructor(
        name: string,
        contractAddress: string,
        tokenDetailsVault: TokenDetails,
        poolInfo: PoolInfo,
    ) {
        super(name, Protocols.UniswapV3, ChainId.Arbitrum, contractAddress, tokenDetailsVault, Tokens.arbitrum.WETH, poolInfo);
    }
}