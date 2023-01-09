import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Token } from '@uniswap/sdk-core';
import erc20 from './helpers/abi/erc20';
import { ethers } from 'ethers';
import { getProvider } from './shared/chains';
import { TokenAmount } from './shared/types/tokens';
import protocolList from './shared/protocols';
import qiAdapter from './shared/protocols/qidao/qidao-adapter';
import { Tokens } from './shared/tokens';
import { Protocol } from './shared/types/protocols';
import { Protocols, ProtocolTypes } from './shared/protocols/constants';
import gmxAdapter from './shared/protocols/gmx/gmx-adapter';

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

app.get('/fetchWalletProtocols', async (req: Request, res: Response) => {
    const address = req.query.address;
    if (address && typeof address === 'string') {
        const prot = await Promise.all(
            protocolList.map(async (protocol: Protocol) => {
                protocol.info = [];
                switch (protocol.symbol) {
                    case Protocols.Qi_Dao:
                        protocol.info.push(await qiAdapter.getFarmInfo(address));
                        return protocol;
                    case Protocols.Mummy:
                        protocol.info.push(await gmxAdapter.getStakingInfo(address));
                        return protocol;
                    default:
                        protocol.info.push({ type: ProtocolTypes.Farms, items: [] });
                        return protocol;
                }
                if (protocol.symbol === Protocols.Qi_Dao) {
                } else {

                }
            })
        );
        res.send(prot);
    }
});

async function getBalances(tokens: Token[], address: string): Promise<TokenAmount[]> {
    const amounts: TokenAmount[] = await Promise.all(tokens.map(async token => {
        const tokenContract = new ethers.Contract(token.address, erc20, getProvider(token.chainId));
        const balance = await tokenContract.balanceOf(address);
        return { token, amount: balance };
    }));
    return amounts;
}

async function getNativeBalances(tokens: Token[], address: string): Promise<TokenAmount[]> {
    const amounts: TokenAmount[] = await Promise.all(tokens.map(async token => {
        const provider = getProvider(token.chainId);
        const balance = (await provider.getBalance(address)).toString();
        (token as any).isNative = true;
        (token as any).isToken = false;
        return { token, amount: balance };
    }));
    return amounts;
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});