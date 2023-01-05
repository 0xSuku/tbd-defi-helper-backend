import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Tokens } from './helpers/tokens';
import { CurrencyAmount, Token } from '@uniswap/sdk-core';
import erc20 from './helpers/abi/erc20';
import { ethers } from 'ethers';
import { ChainId, getProvider } from './helpers/chains';
import { TokenAmount } from './shared/types';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Healthy');
});

app.get('/fetchWalletTokens', async (req: Request, res: Response) => {
    const address = req.query.address;
    if (address && typeof address === 'string') {
        const tokens: Token[] = [];
        const keys = Object.keys(Tokens.polygon);
        for (const key of keys) {
            const currentTokenDetails = Tokens.polygon[key];
            if (!currentTokenDetails.disabled) {
                tokens.push(currentTokenDetails.token);
            }
        }
        const amounts: TokenAmount[] = await getBalances(tokens, address);
        res.send(amounts);
    }
});

app.get('/fetchWalletNatives', async (req: Request, res: Response) => {
    const address = req.query.address;
    if (address && typeof address === 'string') {
        const tokens: Token[] = [];
        const keys = Object.keys(Tokens.nativeTokens);
        for (const key of keys) {
            const currentTokenDetails = Tokens.nativeTokens[key];
            if (!currentTokenDetails.disabled) {
                tokens.push(currentTokenDetails.token);
            }
        }
        
        const amounts: TokenAmount[] = await getNativeBalances(tokens, address);
        res.send(amounts);
    }
});

async function getBalances(tokens: Token[], address: string): Promise<TokenAmount[]> {
    const amounts: TokenAmount[] = await Promise.all(tokens.map(async token => {
        const tokenContract = new ethers.Contract(token.address, erc20, getProvider(token.chainId));
        const balance = await tokenContract.balanceOf(address);
        return { token, amount: balance};
    }));
    return amounts;
}

async function getNativeBalances(tokens: Token[], address: string): Promise<TokenAmount[]> {
    const amounts: TokenAmount[] = await Promise.all(tokens.map(async token => {
        const provider = getProvider(token.chainId);        
        const balance = (await provider.getBalance(address)).toString();
        (token as any).isNative = true;
        (token as any).isToken = false;
        return { token, amount: balance};
    }));
    return amounts;
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});