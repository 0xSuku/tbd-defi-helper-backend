import { ChainId } from '../chains';
import { Protocols, ProtocolTypes } from '../protocols/constants';
import { GmxStakeDepositInfo, GmxVestDepositInfo } from '../protocols/entities/gmx';
import { QiDaoFarmVaultDepositInfo } from '../protocols/entities/qidao';
import { TokenAmount, TokenDetails } from './tokens';

declare type ProtocolItem = {
    pool: TokenDetails[];
    balance: TokenAmount[];
    rewards?: TokenAmount[];
    usdValue: number;
    address: string;
}

declare type ProtocolInfo = {
    items?: ProtocolItem[];
    type: ProtocolTypes;
}

declare type Protocol = {
    info: ProtocolInfo[];
    symbol: Protocols;
    chainId: ChainId;
    name: string;
}

declare type ContractStaticInfo = {
    abi: Record<string, any>[];
    address: string;
    params?: string[];
    name: string;
    protocol: Protocols;
    type: ProtocolTypes;
    chainId: ChainId;
    tokenDetail: TokenDetails;
    tokensDetailRewards: TokenDetails[];
    hidden?: boolean;
    extraAddresses?: string[];
    extraABIs?: string[];
}

declare type GmxProtocolDeposit = GmxStakeDepositInfo | GmxVestDepositInfo;
declare type QiDaoProtocolDeposit = QiDaoFarmVaultDepositInfo;