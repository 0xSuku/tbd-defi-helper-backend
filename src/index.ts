import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import protocolList from './shared/protocols';
import qiAdapter from './shared/protocols/qidao/qidao-adapter';
import gmxAdapter from './protocols/gmx/gmx-backend-adapter';
import { TokenAmount, TokenDetails } from './shared/types/tokens';
import { Tokens } from './shared/tokens';
import { Protocol } from './shared/types/protocols';
import { Protocols, ProtocolTypes } from './shared/protocols/constants';
import { mummyFarms } from './shared/protocols/mummy/mummy-farms';
import { getTokenBalances, getNativeBalances } from './helpers/common';

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
        const tokensDetails: TokenDetails[] = [];
        const keysChains = Object.keys(Tokens);
        for (const keysChain of keysChains) {
            if (keysChain === 'nativeTokens') continue;

            const currentTokensChain = Tokens[keysChain];
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
        const prot = await Promise.all(
            protocolList.map(async (protocol: Protocol) => {
                protocol.info = [];
                switch (protocol.symbol) {
                    case Protocols.Qi_Dao:
                        protocol.info.push(
                            await qiAdapter.getFarmInfo(address)
                        );
                        return protocol;
                    case Protocols.Mummy:
                        protocol.info.push(
                            await gmxAdapter.getStakingInfo(
                                address,
                                mummyFarms,
                                Tokens.fantom.WFTM.token
                            )
                        );
                        return protocol;
                    default:
                        protocol.info.push({ type: ProtocolTypes.Farms, items: [] });
                        return protocol;
                }
            })
        );
        res.send(prot);
    }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});