import { ChainId, getReadContract } from "../shared/chains";
import { rewardRouterABI } from "../shared/protocols/entities/gmx-abis";

async function getGMXContracts() {
    const baseContractAddress = '0xa906f338cb21815cbc4bc87ace9e68c87ef8d8f1';
    const chainId = ChainId.Arbitrum;
    const contract = getReadContract(chainId, baseContractAddress, JSON.stringify(rewardRouterABI));
    const feeGlpTracker = await contract.feeGlpTracker();
    console.log('feeGlpTracker: ' + feeGlpTracker);
    const feeGmxTracker = await contract.feeGmxTracker();
    console.log('feeGmxTracker: ' + feeGmxTracker);
    process.exit();
}

getGMXContracts();