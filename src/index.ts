import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { TokenAmount, TokenDetails } from './shared/types/tokens';
import { Tokens } from './shared/tokens';
import { Protocol, ProtocolInfo } from './shared/types/protocols';
import { Protocols, ProtocolTypes } from './shared/protocols/constants';
import { getTokenBalances, getNativeBalances, fetchCoingeckoPrices } from './helpers/common';
import { mummyFarms } from './shared/protocols/gmx-forks/mummy/mummy-farms';
import { gmxFarms } from './shared/protocols/gmx-forks/gmx/gmx-farms';
import { protocolList } from './shared/protocols/protocol-list';
import qiAdapter from './protocol-adapters/qidao/qidao-backend-adapter';
import gmxAdapter from './protocol-adapters/gmx/gmx-backend-adapter';
import solidlyAdapter from './protocol-adapters/solidly/solidly-backend-adapter';
import uniswapV3Adapter from './protocol-adapters/uniswapV3/uniswapV3-backend-adapter';
import { baymaxFarms } from './shared/protocols/gmx-forks/baymax/baymax-farms';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
fetchCoingeckoPrices();
setInterval(() => fetchCoingeckoPrices(), 30000);

app.get('/', (req: Request, res: Response) => {
    res.send('Healthy');
});

app.get('/fetchWalletTokens', async (req: Request, res: Response) => {
    const address = req.query.address;
    if (address && typeof address === 'string') {
        const tokensDetails: TokenDetails[] = [];
        const keysChains = Object.keys(Tokens);
        for (const keysChain of keysChains) {
            if (keysChain === 'nativeTokens') continue;

            const currentTokensChain = Tokens[keysChain as keyof typeof Tokens];
            const keys = Object.keys(currentTokensChain);
            for (const key of keys) {
                const currentTokenDetails = currentTokensChain[key];
                if (!currentTokenDetails.disabled) {
                    tokensDetails.push(currentTokenDetails);
                }
            }
        }
        const amounts: TokenAmount[] = await getTokenBalances(tokensDetails, address);
        res.send(amounts);
    }
});

app.get('/fetchWalletNatives', async (req: Request, res: Response) => {
    const address = req.query.address;
    if (address && typeof address === 'string') {
        const tokensDetails: TokenDetails[] = [];
        const keys = Object.keys(Tokens.nativeTokens);
        for (const key of keys) {
            const currentTokenDetails = Tokens.nativeTokens[key];
            if (!currentTokenDetails.disabled) {
                tokensDetails.push(currentTokenDetails);
            }
        }

        const amounts: TokenAmount[] = await getNativeBalances(tokensDetails, address);
        res.send(amounts);
    }
});

app.get('/fetchWalletProtocols', async (req: Request, res: Response) => {
    const address = req.query.address;
    if (address && typeof address === 'string') {
        const protocols = await Promise.all(
            protocolList.map(async (protocol: Protocol) => {
                let depositInfo: ProtocolInfo[] = [];
                protocol.info = [];
                switch (protocol.symbol) {
                    case Protocols.Qi_Dao:
                        try {
                            depositInfo = await qiAdapter.fetchDepositInfo(address);
                        } catch (err: any) {
                            debugger;
                        }
                        break;
                    case Protocols.Mummy:
                        try {
                            depositInfo = await gmxAdapter.fetchDepositInfo(address, mummyFarms, protocol.symbol);
                        } catch (err: any) {
                            debugger;
                        }
                        break;
                    case Protocols.GMX:
                        try {
                            depositInfo = await gmxAdapter.fetchDepositInfo(address, gmxFarms, protocol.symbol);
                        } catch (err: any) {
                            debugger;
                        }
                        break;
                    case Protocols.BAYMAX:
                        try {
                            depositInfo = await gmxAdapter.fetchDepositInfo(address, baymaxFarms, protocol.symbol);
                        } catch (err: any) {
                            debugger;
                        }
                        break;
                    case Protocols.Thena:
                        try {
                            depositInfo = await solidlyAdapter.fetchDepositInfo(address);
                        } catch (err: any) {
                            debugger;
                        }
                        break;
                    case Protocols.UniswapV3:
                        try {
                            depositInfo = await uniswapV3Adapter.fetchDepositInfo(address);
                        } catch (err: any) {
                            debugger;
                        }
                        break;
                    default:
                        protocol.info.push({ type: ProtocolTypes.Farms, deposits: [], usdValue: 0 });
                        break;
                }
                if (depositInfo.length) {
                    protocol.info = depositInfo.sort((a, b) => b.usdValue - a.usdValue);
                    protocol.usdValue = protocol.info.reduce((accum, protocolInfo) => accum + protocolInfo.usdValue, 0);
                }

                return protocol;
            })
        );
        res.send(protocols.sort((a, b) => b.usdValue - a.usdValue));
    }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:%s", PORT);
});
