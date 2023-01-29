import { UniswapV3DepositInfo, UniswapV3DepositInfoBase } from "../entities/uniswapv3";
import { UniswapV3Tokens } from "./uniswapv3-tokens";

const WETH_WBTC = new UniswapV3DepositInfo(
    'WETH-WBTC',
    '0x2f5e87c9312fa29aed5c179e456625d79015299c',
    UniswapV3Tokens.UNI_V3_POS,
    'bb7e9353-129f-4e01-b822-f4250d0abb8a'
);

const uniswapV3Deposits: UniswapV3DepositInfoBase[] = [
    WETH_WBTC,
];

export default uniswapV3Deposits;