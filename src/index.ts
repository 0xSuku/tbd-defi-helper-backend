import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Tokens } from './helpers/tokens';
import { CurrencyAmount, Token } from '@uniswap/sdk-core';
import erc20 from './helpers/abi/erc20';
import { ethers } from 'ethers';
import { ChainId } from './helpers/chainId';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Healthy');
});

app.get('/fetchWallet', async (req: Request, res: Response) => {
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
        const currencyAmounts: CurrencyAmount<Token>[] = await getBalances(tokens, address);
        res.send(currencyAmounts);
    }
});

function getProvider(chainId: ChainId) {
    switch (chainId) {
        case ChainId.Polygon:
            return ethers.providers.getDefaultProvider('https://polygon-rpc.com/');
        default:
            return ethers.providers.getDefaultProvider('https://polygon-rpc.com/');
    }
}

async function getBalances(tokens: Token[], address: string): Promise<CurrencyAmount<Token>[]> {
    const currencyAmounts: CurrencyAmount<Token>[] = await Promise.all(tokens.map(async token => {
        const tokenContract = new ethers.Contract(token.address, erc20, getProvider(token.chainId));
        const balance = await tokenContract.balanceOf(address);
        return CurrencyAmount.fromRawAmount(token, balance);
    }));
    return currencyAmounts;
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});