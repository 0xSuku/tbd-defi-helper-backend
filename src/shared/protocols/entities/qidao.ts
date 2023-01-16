import { ChainId } from "../../chains";
import { TokenDetails } from "../../types/tokens";
import { Protocols, ProtocolTypes } from "../constants";
import { DepositInfo } from "./deposit";
import { qiFarmABI } from "../qidao/qidao-abis";

export class QiDaoFarmVaultDepositInfo extends DepositInfo {
    constructor(p: {
        name: string,
        protocol: Protocols,
        chainId: ChainId,
        contractAddress: string,
        vaultId: string,
        tokenDetailsVault: TokenDetails,
        tokenDetailsRewards: TokenDetails
    }) {
        super(qiFarmABI, p.contractAddress, p.tokenDetailsVault, p.tokenDetailsRewards, p.name, p.protocol, ProtocolTypes.Farms, p.chainId);
        
        this.vaultId = p.vaultId;
    }

    vaultId: string;
}