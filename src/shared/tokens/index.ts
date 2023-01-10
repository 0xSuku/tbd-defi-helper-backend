import nativeTokens from './natives';
import polygon from './polygon';
import fantom from './fantom';
import { TokenInfo } from '../types/tokens';

export const Tokens: { [key: string]: TokenInfo } = {
    polygon,
    fantom,
    nativeTokens
}