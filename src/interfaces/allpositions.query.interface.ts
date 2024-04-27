export interface AllPositionQueryResult {
  id: string;
  owner: string;
  amounts: string[];
  investment: {
    id: string;
  };
  changes: { id: string }[];
  harvests: { blockTimestamp: string; dAmounts: string[] }[];
  snapshots: { blockTimestamp: string; amounts: string[] }[];
}

interface TokenInfo {
  decimals: number;
  prices: number[];
}
export interface TokenInfoMap {
  [key: string]: TokenInfo;
}

export interface InvestmentROIs {
  [investmentId: string]: {
    roiByUSDs: number[];
    roiByHolds: number[];
    topPositionIds: string[];
    topPositionScores: number[];
  };
}

export interface InvestmentTrendData {
  id: string;
  roiByUSD: number;
  roiByHold: number;
  positionCount: number;
  ownerCount: number;
  inflowVolume: number; // inflow - outflow
  inflowCount: number;
  topPositions: string[];
}

export interface InvestmentTrendDataWithScore extends InvestmentTrendData {
  id: string;
  roiByUSD: number;
  roiByHold: number;
  positionCount: number;
  ownerCount: number;
  topPositions: string[];
  returnScore: number;
}

export interface PositionChangeQueryResult {
  id: string;
  action: 'Deposit' | 'Withdraw';
  dAmounts: string[];
  blockTimestamp: string;
  position: {
    investment: {
      id: string;
    };
  };
}

