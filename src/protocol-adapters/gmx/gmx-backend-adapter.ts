import { CurrencyAmount } from "@uniswap/sdk-core";
import { getReadContract } from "../../shared/chains";
import { GmxProtocolDeposit, ProtocolInfo, ProtocolItem } from "../../shared/types/protocols";
import { ProtocolTypes } from "../../shared/protocols/constants";
import { getCoingeckoPricesFromTokenDetails } from "../../helpers/common";
import { fetchUsdValue } from "../../helpers/math";
import { ethers } from "ethers";
import { rewardTrackerABI } from "../../shared/protocols/entities/gmx-abis";
import { GmxStakeDepositInfo, GmxVestDepositInfo } from "../../shared/protocols/entities/gmx";

export interface IProtocolAdapter {
    fetchDepositInfo: (address: string, gmxDeposit: GmxProtocolDeposit[]) => Promise<ProtocolInfo[]>;
}

const gmxAdapter: IProtocolAdapter = {
    fetchDepositInfo: async (address: string, gmxFarms: GmxProtocolDeposit[]) => {
        
        let deposits: ProtocolInfo[] = [];

        await Promise.all(
            gmxFarms.map(async (GmxProtocolDeposit: GmxProtocolDeposit) => {
                const stakeContract = getReadContract(GmxProtocolDeposit.chainId, GmxProtocolDeposit.address, JSON.stringify(GmxProtocolDeposit.abi));
                if (stakeContract) {
                    switch (GmxProtocolDeposit.type) {
                        case ProtocolTypes.Staking:
                            try {
                                const stakeDeposit = GmxProtocolDeposit as GmxStakeDepositInfo;
                                if (!stakeDeposit.feeStakeTokenAddress) throw new Error('Should have the fees address');
                                if (!stakeDeposit.tokenFeeRewards) throw new Error('Should have the fees rewards token');

                                const coingeckoResponse = await getCoingeckoPricesFromTokenDetails([
                                    stakeDeposit.tokenDetails,
                                    stakeDeposit.tokenDetailsRewards,
                                    stakeDeposit.tokenFeeRewards
                                ]);

                                const staked = await stakeContract.stakedAmounts(address);
                                const stakedCA = CurrencyAmount.fromRawAmount(stakeDeposit.tokenDetails.token, staked);
                                const stakedExact = stakedCA.toExact();

                                let stakedUsdValue = 0;
                                let stakedPrice = 0;
                                if (staked.gt(0)) {
                                    ({ price: stakedPrice, usdValue: stakedUsdValue } = fetchUsdValue(
                                        coingeckoResponse,
                                        stakeDeposit.tokenDetails,
                                        staked
                                    ));
                                }

                                const stakingRewards = await stakeContract.claimable(address);
                                const stakingRewardsCA = CurrencyAmount.fromRawAmount(stakeDeposit.tokenDetailsRewards.token, stakingRewards);
                                const stakingRewardsExact = stakingRewardsCA.toExact();

                                let stakingRewardsUsdValue = 0;
                                let stakingRewardsPrice = 0;
                                if (staked.gt(0)) {
                                    ({ price: stakingRewardsPrice, usdValue: stakingRewardsUsdValue } = fetchUsdValue(
                                        coingeckoResponse,
                                        stakeDeposit.tokenDetailsRewards,
                                        stakingRewards
                                    ));
                                }

                                const stakeFeesContract = getReadContract(stakeDeposit.chainId, stakeDeposit.feeStakeTokenAddress, JSON.stringify(rewardTrackerABI));
                                const feeStakingRewards = await stakeFeesContract.claimable(address);
                                const feeStakingRewardsCA = CurrencyAmount.fromRawAmount(stakeDeposit.tokenFeeRewards.token, feeStakingRewards);
                                const feeStakingRewardsExact = feeStakingRewardsCA.toExact();

                                let feeStakingRewardsUsdValue = 0;
                                let feeStakingRewardsPrice = 0;
                                if (staked.gt(0)) {
                                    ({ price: feeStakingRewardsPrice, usdValue: feeStakingRewardsUsdValue } = fetchUsdValue(
                                        coingeckoResponse,
                                        stakeDeposit.tokenFeeRewards,
                                        feeStakingRewards
                                    ));
                                }

                                if (staked.gt(0)) {
                                    addProtocolItemToCurrentDeposits(deposits, ProtocolTypes.Staking, {
                                        balance: [{
                                            amount: stakedExact,
                                            tokenDetail: stakeDeposit.tokenDetails,
                                            price: stakedPrice,
                                            usdValue: stakedUsdValue
                                        }],
                                        pool: [stakeDeposit.tokenDetails],
                                        rewards: [{
                                            amount: stakingRewardsExact,
                                            tokenDetail: stakeDeposit.tokenDetailsRewards,
                                            price: stakingRewardsPrice,
                                            usdValue: stakingRewardsUsdValue
                                        }, {
                                            amount: feeStakingRewardsExact,
                                            tokenDetail: stakeDeposit.tokenFeeRewards,
                                            price: feeStakingRewardsPrice,
                                            usdValue: feeStakingRewardsUsdValue
                                        }],
                                        usdValue: 0,
                                        address: GmxProtocolDeposit.address
                                    });
                                }

                            } catch (error) {
                                debugger;
                            }
                            break;
                        case ProtocolTypes.Vesting:
                            try {
                                const vestingDeposit = GmxProtocolDeposit as GmxVestDepositInfo;
                                const coingeckoResponse = await getCoingeckoPricesFromTokenDetails([
                                    vestingDeposit.tokenDetails,
                                    vestingDeposit.tokenDetailsRewards
                                ]);
                                const vestedRewardsBalance = await stakeContract.balanceOf(address);
                                const vestedRewardsBalanceCA = CurrencyAmount.fromRawAmount(vestingDeposit.tokenDetailsRewards.token, vestedRewardsBalance);

                                const vestedRewards = await stakeContract.claimable(address);
                                const vestedRewardsCA = CurrencyAmount.fromRawAmount(vestingDeposit.tokenDetailsRewards.token, vestedRewards);
                                const vestedRewardsExact = vestedRewardsCA.toExact();

                                let vestedRewardsUsdValue = 0;
                                let vestedRewardsPrice = 0;
                                if (vestedRewardsBalance.gt(0)) {
                                    ({ price: vestedRewardsPrice, usdValue: vestedRewardsUsdValue } = fetchUsdValue(
                                        coingeckoResponse,
                                        vestingDeposit.tokenDetailsRewards,
                                        vestedRewards
                                    ));
                                }

                                const vestedBalanceCA = vestedRewardsBalanceCA.subtract(vestedRewardsCA);
                                const vestedBalanceExact = vestedBalanceCA.toExact();
                                const vestedBalance = ethers.utils.parseUnits(vestedBalanceExact, vestingDeposit.tokenDetailsRewards.token.decimals);

                                let vestedUsdValue = 0;
                                let vestedPrice = 0;
                                if (vestedRewardsBalance.gt(0)) {
                                    ({ price: vestedPrice, usdValue: vestedUsdValue } = fetchUsdValue(
                                        coingeckoResponse,
                                        vestingDeposit.tokenDetails,
                                        vestedBalance
                                    ));
                                }


                                if (vestedRewardsBalance.gt(0)) {
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
                                        usdValue: 0,
                                        address: GmxProtocolDeposit.address
                                    });
                                }
                            } catch (error) {
                                debugger;
                            }
                            break;
                    }
                }
            })
        );
        return deposits;
    }
}
export default gmxAdapter;

function addProtocolItemToCurrentDeposits(currentDeposits: ProtocolInfo[], protocolType: ProtocolTypes, protocolItem: ProtocolItem) {
    let deposit = currentDeposits.find(currentDeposit => currentDeposit.type === protocolType);
    if (!deposit) {
        deposit = {
            type: protocolType,
            items: []
        };
        currentDeposits.push(deposit);
    }
    
    deposit.items?.push(protocolItem);
}