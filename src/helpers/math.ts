import { BigNumber, ethers } from "ethers";
import Big from 'big.js';

export function multiplyBNxBN(amount: BigNumber, mul: BigNumber, mulDecimals: number): BigNumber {
	const mulNumber = Number(ethers.utils.formatUnits(mul, mulDecimals).substring(0, 16));
	return multiplyBN(amount, mulNumber);
}

export function multiplyBN(amount: BigNumber, mul: number): BigNumber {
	try {
		const amountBig = new Big(amount.toString());
		const subBig = amountBig.mul(mul);
		return BigNumber.from(subBig.toFixed(0));
	} catch (ex: any) {
		console.log(ex);
		return amount.sub(amount.div(100));
	}
}

export function toFixedTrunc6Digits(number: string) {
	const match = number.match(/^-?\d+(?:\.\d{0,6})?/);
	if (match && match.length > 0) {
		return Number(match[0]);
	} else {
		throw 'error';
	}
}