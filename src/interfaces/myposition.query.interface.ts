import { PositionChangeAction } from "./parsed-position.interface";

export interface MyPositionQueryResult {
  id: string;
  owner: string;
  amounts: string[];
  tag: string;
  investment: {
    id: string;
  };
  meta: string[];
  changes: {
    blockTimestamp: string;
    dAmounts: string[];
    afterAmounts: string[];
    action: PositionChangeAction;
    transactionHash: string;
  }[];
  snapshots: { blockTimestamp: string; amounts: string[] }[];
}
