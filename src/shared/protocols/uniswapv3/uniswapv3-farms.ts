import { ChainId } from "../../chains";
import { Tokens } from "../../tokens";
import { PoolInfo } from "../entities/deposit";
import { UniswapV3DepositInfo } from "../entities/uniswapv3";
import { nonfungiblePositionManagerABI } from "./uniswapv3-abis";
import { UniswapV3Tokens } from "./uniswapv3-tokens";


const sAMM_USDC_BUSD_PoolInfo: PoolInfo = new PoolInfo([
    Tokens.arbitrum.USDC,
    Tokens.arbitrum.BUSD,
], UniswapV3Tokens.UNI_V3_POS.token.address, ChainId.Arbitrum, nonfungiblePositionManagerABI);
const sAMM_USDC_BUSD = new UniswapV3DepositInfo(
    'WETH-WBTC',
    '0x2f5e87c9312fa29aed5c179e456625d79015299c',
    UniswapV3Tokens.UNI_V3_POS,
    sAMM_USDC_BUSD_PoolInfo
);