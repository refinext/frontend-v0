const tokensKovan = { 
  ETH: {
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    name: 'ETH',
    protocol: 'compound',
    decimals: 18,
    chain: 'kovan',
  },
  DAI: {
    address: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
    name: 'DAI',
    protocol: 'compound',
    decimals: 18,
    chain: 'kovan',
  },
  WBTC: {
    address: '0xd3A691C852CDB01E281545A27064741F0B7f6825',
    name: 'WBTC',
    protocol: 'compound',
    decimals: 8,
    chain: 'kovan',
  },
  USDC: {
    address: '0xb7a4F3E9097C08dA09517b5aB877F7a917224ede',
    name: 'USDC',
    protocol: 'compound',
    decimals: 6,
    chain: 'kovan',
  },
};

const tokensRinkeby = { 
  WETH: {
    address: '0xd74047010D77c5901df5b0f9ca518aED56C85e8D',
    name: 'WETH',
    protocol: 'aave',
    decimals: 18,
    chain: 'rinkeby',
  },
  WBTC: {
    address: '0x124F70a8a3246F177b0067F435f5691Ee4e467DD',
    name: 'WBTC',
    protocol: 'aave',
    decimals: 8,
    chain: 'rinkeby',
  },
  DAI: {
    address: '0x4aAded56bd7c69861E8654719195fCA9C670EB45',
    name: 'DAI',
    protocol: 'aave',
    decimals: 18,
    chain: 'rinkeby',
  },
  USDC: {
    address: '0xb18d016cDD2d9439A19f15633005A6b2cd6Aa774',
    name: 'USDC',
    protocol: 'aave',
    decimals: 6,
    chain: 'rinkeby',
  },
};

export { tokensRinkeby, tokensKovan };
