export enum TokenTypes {
	UNUSED = 'UNUSED',
	DAI = 'DAI',
	BUSD = 'BUSD',
	USDT = 'USDT',
	USDC = 'USDC',
	BNB = 'BNB',
	ETH = 'ETH',
	MATIC = 'MATIC',
	METIS = 'METIS',
	BTC = 'BTC',
	ADA = 'ADA',
	FTM = 'FTM',
	AVAX = 'AVAX',
	MAI = 'MAI',
	CRV = 'CRV',
	QI = 'QI',
	HND = 'HND',
	DHV = 'DHV',
	BIFI = 'BIFI',
	SYN = 'SYN',
	SNX = 'SNX',
	KNC = 'KNC',
	MMY = 'MMY',
	GMX = 'GMX',
	esGMX = 'esGMX',
	QUICK = 'QUICK',
	GNO = 'GNO',
	USDPLUS = 'USD+',
	HUM = 'HUM',
	OP = 'OP',
	THE = 'THE',
	FRAX = 'FRAX',
	LINK = 'LINK',
	UNI = 'UNI',
	MIM = 'MIM',
	HAY = 'HAY',
	IDIA = 'IDIA',
	DEI = 'DEI',
	BAY = 'BAY',
}

export interface TokenTypesData {
	isStable: boolean;
	coingeckoName: string;
}

export const tokenTypesData: Record<TokenTypes, TokenTypesData> = {
	'UNUSED': {
		isStable: false,
		coingeckoName: ''
	},
	'DAI': {
		isStable: true,
		coingeckoName: 'dai'
	},
	'BUSD': {
		isStable: true,
		coingeckoName: 'binance-usd'
	},
	'USDT': {
		isStable: true,
		coingeckoName: 'tether'
	},
	'USDC': {
		isStable: true,
		coingeckoName: 'usd-coin'
	},
	'BNB': {
		isStable: false,
		coingeckoName: 'binancecoin'
	},
	'ETH': {
		isStable: false,
		coingeckoName: 'ethereum'
	},
	'MATIC': {
		isStable: false,
		coingeckoName: 'matic-network'
	},
	'BTC': {
		isStable: false,
		coingeckoName: 'bitcoin'
	},
	'ADA': {
		isStable: false,
		coingeckoName: 'cardano'
	},
	'FTM': {
		isStable: false,
		coingeckoName: 'fantom'
	},
	'AVAX': {
		isStable: false,
		coingeckoName: 'avalanche-2'
	},
	'MAI': {
		isStable: false,
		coingeckoName: 'mimatic'
	},
	'CRV': {
		isStable: false,
		coingeckoName: 'curve-dao-token'
	},
	'QI': {
		isStable: false,
		coingeckoName: 'qi-dao'
	},
	'HND': {
		isStable: false,
		coingeckoName: 'hundred-finance'
	},
	'DHV': {
		isStable: false,
		coingeckoName: 'dehive'
	},
	'BIFI': {
		isStable: false,
		coingeckoName: 'beefy-finance'
	},
	'SYN': {
		isStable: false,
		coingeckoName: 'synapse-2'
	},
	'SNX': {
		isStable: false,
		coingeckoName: 'havven'
	},
	'KNC': {
		isStable: false,
		coingeckoName: 'kyber-network-crystal'
	},
	'MMY': {
		isStable: false,
		coingeckoName: 'mummy-finance'
	},
	'GMX': {
		isStable: false,
		coingeckoName: 'gmx'
	},
	'esGMX': {
		isStable: false,
		coingeckoName: 'gmx'
	},
	'QUICK': {
		isStable: false,
		coingeckoName: 'quickswap'
	},
	'GNO': {
		isStable: false,
		coingeckoName: 'gnosis'
	},
	'USD+': {
		isStable: false,
		coingeckoName: 'usd'
	},
	'METIS': {
		isStable: false,
		coingeckoName: 'metis-token'
	},
	'HUM': {
		isStable: false,
		coingeckoName: 'hummus'
	},
	'OP': {
		isStable: false,
		coingeckoName: 'optimism'
	},
	'THE': {
		isStable: false,
		coingeckoName: 'thena'
	},
	'FRAX': {
		isStable: true,
		coingeckoName: 'frax'
	},
	'LINK': {
		isStable: false,
		coingeckoName: 'chainlink'
	},
	'UNI': {
		isStable: false,
		coingeckoName: 'uniswap'
	},
	'MIM': {
		isStable: true,
		coingeckoName: 'magic-internet-money'
	},
	'HAY': {
		isStable: false,
		coingeckoName: 'helio-protocol-hay'
	},
	'IDIA': {
		isStable: false,
		coingeckoName: 'idia'
	},
	'DEI': {
		isStable: true,
		coingeckoName: 'dei-token'
	},
	'BAY': {
		isStable: false,
		coingeckoName: 'baymax-finance'
	}
}