import { uniswapV3Factory, uniswapV3NFTABI, uniswapV3PoolABI } from "./uniswapv3-abis";
import { JSBI } from "@uniswap/sdk";
import { ChainId, getReadContract } from "../../chains";
import { Tokens } from "../../tokens";
import { BigNumber, Event } from "ethers";
import { TokenDetails } from "../../types/tokens";

// V3 standard addresses (different for celo)
const factoryAddress = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
const nftManagerAddress = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";

export interface UniswapV3Amounts {
    tokenDetailsA: TokenDetails;
    tokenDetailsB: TokenDetails;
    amountA: BigNumber;
    amountB: BigNumber;
}

export async function getUniswapV3Amounts(address: string, chainId: ChainId): Promise<UniswapV3Amounts[] | undefined> {
    const factoryContract = getReadContract(chainId, factoryAddress, JSON.stringify(uniswapV3Factory));
    const nftContract = getReadContract(chainId, nftManagerAddress, JSON.stringify(uniswapV3NFTABI));
    const nftAmountOnAddress = await nftContract.balanceOf(address);
    if (nftAmountOnAddress > 0) {
        let tokens;
        if (true) {
            const tokenId = await nftContract.tokenOfOwnerByIndex(address, 0);
            tokens = new Set();
            tokens.add(tokenId.toString());
        } else {
            tokens = await listTokensOfOwner(chainId, nftManagerAddress, address);
        }
        const tokenIds = tokens.values();

        let poolsInfo: UniswapV3Amounts[] = [];
        for (const tokenId of tokenIds) {
            const position = await nftContract.positions(tokenId);

            const v3pool = await factoryContract.getPool(position.token0, position.token1, position.fee);
            const poolContract = getReadContract(chainId, v3pool, JSON.stringify(uniswapV3PoolABI));
            const slot0 = await poolContract.slot0();

            let tokenDetailsA;
            let tokenDetailsB;
            const chainTokens = Tokens[ChainId[chainId].toLowerCase() as keyof typeof Tokens];
            for (const chainTokensProp in chainTokens) {
                if (chainTokens[chainTokensProp].token.address === position.token0) {
                    tokenDetailsA = chainTokens[chainTokensProp];
                } else {
                    if (chainTokens[chainTokensProp].token.address === position.token1) {
                        tokenDetailsB = chainTokens[chainTokensProp];
                    }
                }
            }

            if (!tokenDetailsA || !tokenDetailsB) {
                console.log('Some token is not registered');
                return;
            }

            const amounts = await getUniswapV3TokenAmounts(
                position.liquidity.toString(),
                slot0.sqrtPriceX96.toString(),
                position.tickLower,
                position.tickUpper,
            );
            poolsInfo.push({
                tokenDetailsA,
                tokenDetailsB,
                amountA: BigNumber.from(amounts[0]),
                amountB: BigNumber.from(amounts[1]),
            })

        }
        return poolsInfo;
    }
    return;
}

const Q96: any = JSBI.exponentiate(JSBI.BigInt(2), JSBI.BigInt(96));

function getTickAtSqrtRatio(sqrtPriceX96: any) {
    let tick = Math.floor(Math.log((sqrtPriceX96 / Q96) ** 2) / Math.log(1.0001));
    return tick;
}

export async function getUniswapV3TokenAmounts(liquidity: any, sqrtPriceX96: any, tickLow: any, tickHigh: any) {
    let sqrtRatioA = Math.sqrt(1.0001 ** tickLow);
    let sqrtRatioB = Math.sqrt(1.0001 ** tickHigh);

    let currentTick = getTickAtSqrtRatio(sqrtPriceX96);
    let sqrtPrice = sqrtPriceX96 / Q96;

    let amount0wei = 0;
    let amount1wei = 0;
    if (currentTick <= tickLow) {
        amount0wei = Math.floor(liquidity * ((sqrtRatioB - sqrtRatioA) / (sqrtRatioA * sqrtRatioB)));
    }
    else if (currentTick > tickHigh) {
        amount1wei = Math.floor(liquidity * (sqrtRatioB - sqrtRatioA));
    }
    else if (currentTick >= tickLow && currentTick < tickHigh) {
        amount0wei = Math.floor(liquidity * ((sqrtRatioB - sqrtPrice) / (sqrtPrice * sqrtRatioB)));
        amount1wei = Math.floor(liquidity * (sqrtPrice - sqrtRatioA));
    }
    return [amount0wei.toString(), amount1wei.toString()]
}

async function listTokensOfOwner(chainId: ChainId, _nftManagerAddress: string, account: string) {
    const nftContract = getReadContract(chainId, _nftManagerAddress, JSON.stringify(uniswapV3NFTABI));

    const sentLogs = await nftContract.queryFilter(
        nftContract.filters.Transfer(account, null),
    );
    const receivedLogs = await nftContract.queryFilter(
        nftContract.filters.Transfer(null, account),
    );

    const logs = sentLogs.concat(receivedLogs)
        .sort((a: Event, b: Event) =>
            a.blockNumber - b.blockNumber ||
            a.transactionIndex - b.transactionIndex,
        );

    const owned = new Set();
    for (const log of logs) {
        if (log.args) {
            if (addressEqual(log.args.to, account)) {
                owned.add(log.args.tokenId.toString());
            } else if (addressEqual(log.args.from, account)) {
                owned.delete(log.args.tokenId.toString());
            }
        }
    }

    return owned;
};

function addressEqual(a: string, b: string) {
    return a.toLowerCase() === b.toLowerCase();
}