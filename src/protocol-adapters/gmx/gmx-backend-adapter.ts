import { CurrencyAmount, Token } from "@uniswap/sdk-core";
import { getCoingeckoPricesFromTokenDetails } from "../../helpers/common";
import { fetchUsdValue } from "../../helpers/math";
import { BigNumber, ethers } from "ethers";
import { addProtocolItemToCurrentDeposits, getBalanceFromLP } from "../helpers";
import { ProtocolTypes } from "../../shared/protocols/constants";
import { GmxStakeDepositInfo, GmxVestDepositInfo } from "../../shared/protocols/entities/gmx";
import { GmxProtocolDeposit, ProtocolInfo } from "../../shared/types/protocols";
import { CoingeckoResponse, TokenAmount } from "../../shared/types/tokens";
import { getReadContract } from "../../shared/chains";
import erc20 from "../../helpers/abi/erc20";

export interface IProtocolAdapter {
    fetchDepositInfo: (address: string, gmxDeposit: GmxProtocolDeposit[]) => Promise<ProtocolInfo[]>;
}

const gmxAdapter: IProtocolAdapter = {
    fetchDepositInfo: async (address: string, gmxFarms: GmxProtocolDeposit[]) => {

        let deposits: ProtocolInfo[] = [];

        await Promise.all(
            gmxFarms.map(async (depositInfo: GmxProtocolDeposit) => {
                switch (depositInfo.type) {
                    case ProtocolTypes.Staking:
                        try {
                            const _depositInfo = depositInfo as GmxStakeDepositInfo;
                            if (!_depositInfo.feeStakeTokenAddress) throw new Error('Should have the fees address');
                            if (!_depositInfo.tokenFeeRewards) throw new Error('Should have the fees rewards token');

                            const coingeckoResponse = await getCoingeckoPricesFromTokenDetails([
                                _depositInfo.tokenDetails,
                                _depositInfo.tokenDetailsRewards,
                                _depositInfo.tokenFeeRewards,
                                ...(
                                    _depositInfo.poolInfo ?
                                        _depositInfo.poolInfo.tokens :
                                        []
                                )
                            ]);

                            const staked = await _depositInfo.getDepositAmount(address);
                            const stakedCA = CurrencyAmount.fromRawAmount(_depositInfo.tokenDetails.token, staked.toString());
                            const stakedExact = stakedCA.toExact();

                            let balanceTokens: TokenAmount[] = [];
                            if (_depositInfo.poolInfo) {
                                balanceTokens = await getBalanceFromLP(_depositInfo, stakedCA, coingeckoResponse);
                            } else {
                                let stakedUsdValue = 0;
                                let stakedPrice = 0;

                                ({ price: stakedPrice, usdValue: stakedUsdValue } = fetchUsdValue(
                                    coingeckoResponse,
                                    _depositInfo.tokenDetails,
                                    staked
                                ));

                                balanceTokens = [{
                                    amount: stakedExact,
                                    tokenDetail: _depositInfo.tokenDetails,
                                    price: stakedPrice,
                                    usdValue: stakedUsdValue
                                }];
                            }

                            const stakingRewards = await _depositInfo.getRewardAmount(address);
                            const stakingRewardsCA = CurrencyAmount.fromRawAmount(_depositInfo.tokenDetailsRewards.token, stakingRewards.toString());
                            const stakingRewardsExact = stakingRewardsCA.toExact();

                            const feeStakingRewards = await _depositInfo.getRewardFeesAmount(address);
                            const feeStakingRewardsCA = CurrencyAmount.fromRawAmount(_depositInfo.tokenFeeRewards.token, feeStakingRewards.toString());
                            const feeStakingRewardsExact = feeStakingRewardsCA.toExact();

                            if (staked.gt(0)) {
                                let feeStakingRewardsUsdValue = 0;
                                let feeStakingRewardsPrice = 0;
                                let stakingRewardsUsdValue = 0;
                                let stakingRewardsPrice = 0;

                                ({ price: stakingRewardsPrice, usdValue: stakingRewardsUsdValue } = fetchUsdValue(
                                    coingeckoResponse,
                                    _depositInfo.tokenDetailsRewards,
                                    stakingRewards
                                ));
                                ({ price: feeStakingRewardsPrice, usdValue: feeStakingRewardsUsdValue } = fetchUsdValue(
                                    coingeckoResponse,
                                    _depositInfo.tokenFeeRewards,
                                    feeStakingRewards
                                ));
                                const balanceTokensUsdValue = balanceTokens.reduce((accum, bt) => accum + bt.usdValue, 0);
                                let totalUsdValue = balanceTokensUsdValue + stakingRewardsUsdValue + feeStakingRewardsUsdValue;

                                addProtocolItemToCurrentDeposits(deposits, ProtocolTypes.Staking, {
                                    balance: balanceTokens,
                                    pool: [_depositInfo.tokenDetails],
                                    rewards: [{
                                        amount: stakingRewardsExact,
                                        tokenDetail: _depositInfo.tokenDetailsRewards,
                                        price: stakingRewardsPrice,
                                        usdValue: stakingRewardsUsdValue
                                    }, {
                                        amount: feeStakingRewardsExact,
                                        tokenDetail: _depositInfo.tokenFeeRewards,
                                        price: feeStakingRewardsPrice,
                                        usdValue: feeStakingRewardsUsdValue
                                    }],
                                    usdValue: totalUsdValue,
                                    address: depositInfo.address,
                                    name: depositInfo.name
                                });
                            }

                        } catch (error) {
                            debugger;
                        }
                        break;
                    case ProtocolTypes.Vesting:
                        try {
                            const vestingDeposit = depositInfo as GmxVestDepositInfo;

                            const coingeckoResponse = await getCoingeckoPricesFromTokenDetails([
                                vestingDeposit.tokenDetails,
                                vestingDeposit.tokenDetailsRewards
                            ]);

                            const vestedRewardsBalance = await vestingDeposit.getDepositAmount(address);
                            const vestedRewardsBalanceCA = CurrencyAmount.fromRawAmount(vestingDeposit.tokenDetailsRewards.token, vestedRewardsBalance.toString());

                            const vestedRewards = await vestingDeposit.getRewardAmount(address);
                            const vestedRewardsCA = CurrencyAmount.fromRawAmount(vestingDeposit.tokenDetailsRewards.token, vestedRewards.toString());
                            const vestedRewardsExact = vestedRewardsCA.toExact();

                            const vestedBalanceCA = vestedRewardsBalanceCA.subtract(vestedRewardsCA);
                            const vestedBalanceExact = vestedBalanceCA.toExact();
                            const vestedBalance = ethers.utils.parseUnits(vestedBalanceExact, vestingDeposit.tokenDetailsRewards.token.decimals);

                            if (vestedRewardsBalance.gt(0)) {
                                let vestedUsdValue = 0;
                                let vestedPrice = 0;
                                let vestedRewardsUsdValue = 0;
                                let vestedRewardsPrice = 0;
                                ({ price: vestedRewardsPrice, usdValue: vestedRewardsUsdValue } = fetchUsdValue(
                                    coingeckoResponse,
                                    vestingDeposit.tokenDetailsRewards,
                                    vestedRewards
                                ));
                                ({ price: vestedPrice, usdValue: vestedUsdValue } = fetchUsdValue(
                                    coingeckoResponse,
                                    vestingDeposit.tokenDetails,
                                    vestedBalance
                                ));
                                
                                let totalUsdValue = vestedRewardsUsdValue + vestedUsdValue;
                                addProtocolItemToCurrentDeposits(deposits, ProtocolTypes.Vesting, {
                                    balance: [{
                                        amount: vestedBalanceExact,
                                        tokenDetail: vestingDeposit.tokenDetails,
                                        price: vestedPrice,
                                        usdValue: vestedUsdValue
                                    }],
                                    pool: [vestingDeposit.tokenDetails],
                                    rewards: [{
                                        amount: vestedRewardsExact,
                                        tokenDetail: vestingDeposit.tokenDetailsRewards,
                                        price: vestedRewardsPrice,
                                        usdValue: vestedRewardsUsdValue
                                    }],
                                    usdValue: totalUsdValue,
                                    address: depositInfo.address,
                                    name: depositInfo.name
                                });
                            }
                        } catch (error) {
                            debugger;
                        }
                        break;
                }
            })
        );
        return deposits.map(depositInfo => {
            depositInfo.items = depositInfo.items?.sort((a, b) => b.usdValue - a.usdValue);
            return depositInfo;
        });
    }
}
export default gmxAdapter;


