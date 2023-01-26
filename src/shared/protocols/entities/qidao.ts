import { ChainId, getReadContract } from "../../chains";
import { TokenDetails } from "../../types/tokens";
import { Protocols, ProtocolTypes } from "../constants";
import { DepositInfo, PoolInfoBase } from "./deposit";
import { qiFarmABI } from "../qidao/qidao-abis";
import { BigNumber, ethers } from "ethers";

export class QiDaoFarmVaultDepositInfo extends DepositInfo {
    contract: ethers.Contract;
    vaultId: string;
    poolInfo?: PoolInfoBase;
    
    constructor(
        name: string,
        chainId: ChainId,
        contractAddress: string,
        vaultId: string,
        tokenDetailsVault: TokenDetails,
        tokenDetailsRewards: TokenDetails,
        poolInfo?: PoolInfoBase,
    ) {
        super(qiFarmABI, contractAddress, tokenDetailsVault, tokenDetailsRewards, name, Protocols.Qi_Dao, ProtocolTypes.Farms, chainId);
        
        this.vaultId = vaultId;
        this.contract = getReadContract(this.chainId, this.address, JSON.stringify(qiFarmABI));
        this.poolInfo = poolInfo;
    }

    async getDepositAmount(address: string): Promise<BigNumber> {
        return await this.contract.deposited(this.vaultId, address);
    }

    async getRewardAmount(address: string): Promise<BigNumber> {
        return await this.contract.pending(this.vaultId, address);
    }
}