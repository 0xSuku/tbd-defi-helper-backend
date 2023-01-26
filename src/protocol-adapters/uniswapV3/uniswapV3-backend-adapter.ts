import { getCoingeckoPricesFromTokenDetails } from "../../helpers/common";
import { ProtocolInfo } from "../../shared/types/protocols";
import { ProtocolTypes } from "../../shared/protocols/constants";
import { addProtocolItemToCurrentDeposits } from "../helpers";
import { TokenAmount, TokenDetails } from "../../shared/types/tokens";
import { getUniswapV3Amounts } from "../../shared/protocols/uniswapv3/uniswapv3";
import { UniswapV3DepositInfoBase } from "../../shared/protocols/entities/uniswapv3";
import { fetchUsdValue } from "../../helpers/math";
import uniswapV3Deposits from "../../shared/protocols/uniswapv3/uniswapv3-farms";
import { ethers } from "ethers";

export interface IProtocolAdapter {
    fetchDepositInfo: (address: string) => Promise<ProtocolInfo[]>;
}

const uniswapV3Adapter: IProtocolAdapter = {
    fetchDepositInfo: async (address: string) => {
        let deposits: ProtocolInfo[] = [];

        await Promise.all(uniswapV3Deposits.map(async (depositInfo: UniswapV3DepositInfoBase) => {
            if (depositInfo.contract) {
                const uniswapV3Positions = await getUniswapV3Amounts(address, depositInfo.chainId);
                if (uniswapV3Positions && uniswapV3Positions.length) {
                    let balanceTokens: TokenAmount[] = [];
                    const allTokens: TokenDetails[] = [];
                    await Promise.all(uniswapV3Positions.map(async uniV3Pos => {
                        allTokens.push(...[uniV3Pos.tokenDetailsA, uniV3Pos.tokenDetailsB]);

                        const coingeckoResponse = await getCoingeckoPricesFromTokenDetails(allTokens);

                        let stakedAPrice = 0;
                        let stakedAUsdValue = 0;
                        ({ price: stakedAPrice, usdValue: stakedAUsdValue } = fetchUsdValue(
                            coingeckoResponse,
                            uniV3Pos.tokenDetailsA,
                            uniV3Pos.amountA
                        ));
                        let stakedBPrice = 0;
                        let stakedBUsdValue = 0;
                        ({ price: stakedBPrice, usdValue: stakedBUsdValue } = fetchUsdValue(
                            coingeckoResponse,
                            uniV3Pos.tokenDetailsB,
                            uniV3Pos.amountB
                        ));

                        balanceTokens.push({
                            amount: ethers.utils.formatUnits(uniV3Pos.amountA, uniV3Pos.tokenDetailsA.token.decimals),
                            tokenDetail: uniV3Pos.tokenDetailsA,
                            price: stakedAPrice,
                            usdValue: stakedAUsdValue
                        }, {
                            amount: ethers.utils.formatUnits(uniV3Pos.amountB, uniV3Pos.tokenDetailsB.token.decimals),
                            tokenDetail: uniV3Pos.tokenDetailsB,
                            price: stakedBPrice,
                            usdValue: stakedBUsdValue
                        });
                        const totalUsdValue = stakedAUsdValue + stakedBUsdValue;
                        addProtocolItemToCurrentDeposits(deposits, ProtocolTypes.LiquidityPool, {
                            balance: balanceTokens,
                            pool: [depositInfo.tokenDetails],
                            rewards: [],
                            usdValue: totalUsdValue,
                            address: depositInfo.address,
                            name: depositInfo.name
                        });
                    }));
                }
            }
        }));
        return deposits.map(depositInfo => {
            depositInfo.items = depositInfo.items?.sort((a, b) => b.usdValue - a.usdValue);
            return depositInfo;
        });
    }
}
export default uniswapV3Adapter;
