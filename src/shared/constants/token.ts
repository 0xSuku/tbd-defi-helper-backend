export enum TokenTypes {
	UNUSED = 'UNUSED',
	DAI = 'DAI',
	BUSD = 'BUSD',
	USDT = 'USDT',
	USDC = 'USDC',

	BNB = 'BNB',
	ETH = 'ETH',
	MATIC = 'MATIC',
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
		coingeckoName: ''
	},
	'USDT': {
		isStable: true,
		coingeckoName: ''
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
	}
}