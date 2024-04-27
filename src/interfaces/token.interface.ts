export interface Token {
  id: string;
  address: string;
  chainId: number;
  decimals: number;
  logoURI: string;
  name: string;
  priceUSD: number;
  symbol: string;
  tier: number;
  type: string;
  canonical: string;
  isolated: boolean;
  color: string;
  lastSyncDate: string;
  priceHistory: number[];
}
