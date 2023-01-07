import { Token } from "@uniswap/sdk-core"

type TokenInfo = {
    [key: string]: TokenDetails;
}

type TokenDetails = {
    token: Token;
    disabled?: boolean;
}

type TokenAmount = { 
    token: Token;
    amount: string;
}