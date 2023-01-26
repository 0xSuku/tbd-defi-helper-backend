
import erc20 from "./abi/erc20";
import { ethers } from "ethers";
import { getProvider } from "../shared/chains";
import axios from "axios";
import { TokenDetails, TokenAmount, CoingeckoResponse } from "../shared/types/tokens";
import { multiplyBN, toFixedTrunc6Digits } from "./math";
import { tokenTypesData, TokenTypes } from "../shared/constants/token";

let coingeckoPrices: CoingeckoResponse;

export async function getTokenBalances(tokensDetails: TokenDetails[], address: string): Promise<TokenAmount[]> {
    const coingeckoResponse = await getCoingeckoPricesFromTokenDetails(tokensDetails);
    let amounts: TokenAmount[] = await Promise.all(tokensDetails.map(async tokenDetail => {
        const tokenContract = new ethers.Contract(tokenDetail.token.address, erc20, getProvider(tokenDetail.token.chainId));
        const balanceBN = await tokenContract.balanceOf(address);
        const balance = balanceBN.toString();
        const price = coingeckoResponse[tokenTypesData[tokenDetail.tokenInfo].coingeckoName];
        if (!price) {
            console.log(tokenDetail.tokenInfo + ' coingecko doesnt exists');
            return {
                tokenDetail,
                amount: balance,
                price: 0,
                usdValue: 0
            }
        }
        const usdValue = multiplyBN(balanceBN, price.usd);
        const usdValueString = ethers.utils.formatUnits(usdValue, tokenDetail.token.decimals);
        const tokenAmount: TokenAmount = {
            tokenDetail,
            amount: balance,
            price: price.usd,
            usdValue: toFixedTrunc6Digits(usdValueString)
        }
        return tokenAmount;
    }));
    return amounts;
}

export async function getNativeBalances(tokensDetails: TokenDetails[], address: string): Promise<TokenAmount[]> {
    const coingeckoResponse = await getCoingeckoPricesFromTokenDetails(tokensDetails);
    const amounts: TokenAmount[] = await Promise.all(tokensDetails.map(async tokenDetail => {
        const provider = getProvider(tokenDetail.token.chainId);
        const balanceBN = await provider.getBalance(address);
        const balance = balanceBN.toString();
        const price = coingeckoResponse[tokenTypesData[tokenDetail.tokenInfo].coingeckoName];
        const usdValue = multiplyBN(balanceBN, price.usd);
        const usdValueString = ethers.utils.formatUnits(usdValue, tokenDetail.token.decimals);
        (tokenDetail as any).isNative = true;
        (tokenDetail as any).isToken = false;
        const tokenAmount: TokenAmount = {
            tokenDetail,
            amount: balance,
            price: price.usd,
            usdValue: toFixedTrunc6Digits(usdValueString)
        }
        return tokenAmount;
    }));
    return amounts;
}

export async function getCoingeckoPricesFromTokenDetails(tokenDetails: TokenDetails[]): Promise<CoingeckoResponse> {
    const coingeckoIds = tokenDetails.map(td => tokenTypesData[td.tokenInfo].coingeckoName);
    return getCoingeckoPrices(coingeckoIds);
}

export async function getCoingeckoPrices(coingeckoIds: string[]): Promise<CoingeckoResponse> {
    if (coingeckoPrices) {
        return coingeckoPrices;
    }
    console.log('Havent loaded coingecko prices');
    await delay(2000);
    return getCoingeckoPrices(coingeckoIds);
}

export async function delay(ms: number): Promise<unknown> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

export async function fetchCoingeckoPrices(): Promise<void> {
    const tokenTypesDataKeys = Object.keys(tokenTypesData);
    let coingeckoIds: string[] = [];
    for (const tokenTypesDataKey of tokenTypesDataKeys) {
        const coingeckoName = tokenTypesData[tokenTypesDataKey as TokenTypes].coingeckoName;
        if (coingeckoName) {
            coingeckoIds.push(coingeckoName);
        }
    }
    const request = { ids: '', vs_currencies: 'usd' };
    for (const id of coingeckoIds) {
        request.ids += id + ',';
    }
    request.ids = request.ids.substring(0, request.ids.length - 1);
    const pricesResponse = await axios.get<CoingeckoResponse>('https://api.coingecko.com/api/v3/simple/price', { params: request });
    coingeckoPrices = pricesResponse.data;
}