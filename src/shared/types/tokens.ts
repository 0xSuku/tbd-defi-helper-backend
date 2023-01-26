import { Token } from "@uniswap/sdk-core"
import { TokenTypes } from "../constants/token";

export interface TokenInfo {
    [key: string]: TokenDetails;
}

export interface TokenDetails {
    token: Token;
    tokenInfo: TokenTypes;
    disabled?: boolean;
}

export interface TokenAmount { 
    tokenDetail: TokenDetails;
    price: number;
    usdValue: number;
    amount: string;
}

export interface CoingeckoResponse {
	[key: string]: {
		usd: number;
	};
}