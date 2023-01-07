import { Token } from '@uniswap/sdk-core'
import { ChainId } from '../chains';
import { Protocols, ProtocolTypes } from '../protocols/constants';

declare type CurrencyAmountHttp = {
    amount: string;
    currency: Token;
}

declare type ProtocolItem = {
    pool: Token[];
    balance: CurrencyAmountHttp[];
    rewards?: CurrencyAmountHttp[];
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
    token: Token;
    tokenRewards: Token;
    hidden?: boolean;
}