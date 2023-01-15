import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import protocolList from './shared/protocols';
import qiAdapter from './protocols/qidao/qidao-backend-adapter';
import gmxAdapter from './protocols/gmx/gmx-backend-adapter';
import cors from 'cors';
import { TokenAmount, TokenDetails } from './shared/types/tokens';
import { Tokens } from './shared/tokens';
import { Protocol } from './shared/types/protocols';
import { Protocols, ProtocolTypes } from './shared/protocols/constants';
import { mummyFarms } from './shared/protocols/mummy/mummy-farms';
import { getTokenBalances, getNativeBalances, fetchCoingeckoPrices } from './helpers/common';
import { gmxFarms } from './shared/protocols/gmx/gmx-farms';

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
                        const qiDaoInfo = await qiAdapter.getFarmInfo(address);
                        if (qiDaoInfo.items?.length)
                            protocol.info.push(qiDaoInfo);

                        return protocol;
                    case Protocols.Mummy:
                        const mummyInfo = await gmxAdapter.getStakingInfo(
                            address,
                            mummyFarms,
                            '0xA6D7D0e650aa40FFa42d845A354c12c2bc0aB15f'
                        );
                        if (mummyInfo.items?.length)
                            protocol.info.push(mummyInfo);

                        return protocol;
                    case Protocols.GMX:
                        const gmxInfo = await gmxAdapter.getStakingInfo(
                            address,
                            gmxFarms,
                            '0x489ee077994b6658eafa855c308275ead8097c4a'
                        )
                        if (gmxInfo.items?.length)
                            protocol.info.push(gmxInfo);

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
    console.log("Server listening on: http://localhost:%s", PORT);
});