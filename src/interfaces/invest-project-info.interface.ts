export interface InvestInfo {
  name: string;
  address: string;
  tag: string;
  chainId: number;
  category: string;
  inputAssets: string[];
  rewardAssets: string[];
  idAtSubgraph: string | null;
}

export interface ProjectInfo {
  chainId: number;
  name: string;
  subgraphUrl: string;
  logoURI: string;
  autoWrap: boolean;
}
export interface ProjectInfoWithInvests extends ProjectInfo {
  invests: InvestInfo[];
}
