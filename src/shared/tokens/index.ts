import nativeTokens from './natives';
import polygon from './polygon';
import fantom from './fantom';
import arbitrum from './arbitrum';
import ethereum from './ethereum';
import avalanche from './avalanche';
import bnb from './bnb';
import gnosis from './gnosis';
import optimism from './optimism';
import metis from './metis';
import { TokenInfo } from '../types/tokens';

export const Tokens: { [key: string]: TokenInfo } = {
    ethereum,
    optimism,
    bnb,
    gnosis,
    polygon,
    fantom,
    metis,
    arbitrum,
    avalanche,
    nativeTokens
}