import { Token } from "@uniswap/sdk-core"
import { TokenTypes } from "../constants/token";

type TokenInfo = {
    [key: string]: TokenDetails;
}

type TokenDetails = {
    token: Token;
    tokenInfo: TokenTypes;
    disabled?: boolean;
}

type TokenAmount = { 
    tokenDetail: TokenDetails;
    price: number;
    usdValue: number;
    amount: string;
}

type CoingeckoResponse = {
	[key: string]: {
		usd: number;
	};
}