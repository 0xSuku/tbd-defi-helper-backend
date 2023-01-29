import { CurrencyAmount, Token } from "@uniswap/sdk-core";
import { BigNumber, ethers } from "ethers";
import erc20 from "../helpers/abi/erc20";
import { fetchUsdValue } from "../helpers/math";
import { getReadContract } from "../shared/chains";
import { arrakisVaultV1 } from "../shared/protocols/arrakis/arrakis-abis";
import { ProtocolTypes } from "../shared/protocols/constants";
import { ArrakisPoolInfo, DepositInfo } from "../shared/protocols/entities/deposit";
import { ProtocolInfo, DepositItem } from "../shared/types/protocols";
import { CoingeckoResponse, TokenAmount } from "../shared/types/tokens";

export function addProtocolItemToCurrentDeposits(currentDeposits: ProtocolInfo[], protocolType: ProtocolTypes, protocolItem: DepositItem) {
    let deposit = currentDeposits.find(currentDeposit => currentDeposit.type === protocolType);
    if (!deposit) {
        deposit = {
            type: protocolType,
            deposits: [],
            usdValue: 0,
        };
        currentDeposits.push(deposit);
    }

    deposit.deposits?.push(protocolItem);
    deposit.usdValue += protocolItem.usdValue;
}

export async function getBalanceFromLP(stakeDeposit: DepositInfo, stakedCA: CurrencyAmount<Token>, coingeckoResponse: CoingeckoResponse) {
    let balanceTokens: TokenAmount[] = [];
    // Not an erc20
    const tokenDetailsContract = getReadContract(stakeDeposit.chainId, stakeDeposit.tokenDetails.token.address, JSON.stringify(erc20));
    const maxTokenDetailsSupply = await tokenDetailsContract.totalSupply();
    const maxTokenDetailsSupplyCA = CurrencyAmount.fromRawAmount(stakeDeposit.tokenDetails.token, maxTokenDetailsSupply.toString());

    // Percentage = Owned / Total * 100
    const ownedPercentageAux = stakedCA.divide(maxTokenDetailsSupplyCA);
    // Clean decimals
    const ownedPercentageDivision = ownedPercentageAux.multiply(Math.pow(10, stakeDeposit.tokenDetails.token.decimals));
    // Calculate real percentage
    const ownedPercentage = ownedPercentageDivision.multiply(100);

    // Never will be false
    if (!stakeDeposit.poolInfo) return [];
    balanceTokens = await Promise.all(
        stakeDeposit.poolInfo?.tokens.map(async (tokenDetails, index) => {
            let tokenContractBalance = BigNumber.from(0);
            if (stakeDeposit.poolInfo instanceof ArrakisPoolInfo) {
                const underlyingBalances = await stakeDeposit.poolInfo.contract.getUnderlyingBalances();
                tokenContractBalance = underlyingBalances[index];
            } else {
                const tokenContract = getReadContract(stakeDeposit.chainId, tokenDetails.token.address, JSON.stringify(erc20));
                tokenContractBalance = await tokenContract.balanceOf(stakeDeposit.poolInfo?.address);
            }
            const tokenContractBalanceCA = CurrencyAmount.fromRawAmount(tokenDetails.token, tokenContractBalance.toString());

            const virtuallyOwnedTokensAux = tokenContractBalanceCA.divide(100).multiply(ownedPercentage);
            // Clean decimals
            const virtuallyOwnedTokensCA = virtuallyOwnedTokensAux.divide(Math.pow(10, stakeDeposit.tokenDetails.token.decimals));
            const virtuallyOwnedTokensExact = virtuallyOwnedTokensCA.toFixed(tokenDetails.token.decimals);
            const virtuallyOwnedTokens = ethers.utils.parseUnits(virtuallyOwnedTokensExact, tokenDetails.token.decimals);

            let stakedTokensUsdValue = 0;
            let stakedTokensPrice = 0;
            ({ price: stakedTokensPrice, usdValue: stakedTokensUsdValue } = fetchUsdValue(
                coingeckoResponse,
                tokenDetails,
                virtuallyOwnedTokens
            ));

            return {
                amount: virtuallyOwnedTokensExact,
                tokenDetail: tokenDetails,
                price: stakedTokensPrice,
                usdValue: stakedTokensUsdValue
            };
        })
    );
    return balanceTokens;
}