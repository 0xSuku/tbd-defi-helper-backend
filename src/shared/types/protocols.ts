import { ChainId } from '../chains';
import { Protocols, ProtocolTypes } from '../protocols/constants';
import { GmxStakeDepositInfo, GmxVestDepositInfo, MummyStakeDepositInfo, MummyVestDepositInfo } from '../protocols/entities/gmx';
import { QiDaoFarmVaultDepositInfo } from '../protocols/entities/qidao';
import { TokenAmount, TokenDetails } from './tokens';

export interface ProtocolItem {
    pool: TokenDetails[];
    balance: TokenAmount[];
    rewards?: TokenAmount[];
    usdValue: number;
    address: string;
    name: string;
}

export interface ProtocolInfo {
    items?: ProtocolItem[];
    usdValue: number;
    type: ProtocolTypes;
}

export interface Protocol {
    info: ProtocolInfo[];
    symbol: Protocols;
    chainId: ChainId;
    name: string;
    usdValue: number;
}

export declare type GmxProtocolDeposit = GmxStakeDepositInfo | MummyStakeDepositInfo | GmxVestDepositInfo | MummyVestDepositInfo;
export declare type QiDaoProtocolDeposit = QiDaoFarmVaultDepositInfo;