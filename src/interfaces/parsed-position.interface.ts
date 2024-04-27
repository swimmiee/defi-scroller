import { Token } from "./token.interface";

export enum PositionChangeAction {
  Deposit = "Deposit",
  Withdraw = "Withdraw",
  Harvest = "Harvest",
  Borrow = "Borrow",
  Repay = "Repay",
  Liquidate = "Liquidate",
  Send = "Send",
  Receive = "Receive",
  Stake = "Stake",
  Unstake = "Unstake",
}

// in case of investment,
// these actions are considered as deposit or withdraw
// to calculate the net pnl excluding inbounds and outbounds
export const changeValueActions = [
  PositionChangeAction.Deposit,
  PositionChangeAction.Withdraw,
  PositionChangeAction.Liquidate,
  PositionChangeAction.Send,
  PositionChangeAction.Receive,
];

export interface ParsedPositionSnapshot {
  date: string;
  timestamp: Date;
  amounts: number[];
  valueUSD: number;
  prices: number[];
}

export interface ParsedPositionChange {
  timestamp: Date;
  transactionHash: string;
  action: PositionChangeAction;
  dAmounts: number[];
  dValueUSD: number;
  afterAmounts: number[];
  afterValueUSD: number;
  prices: number[];
}

export interface ParsedPosition {
  id: string;
  owner: string;
  investAddress: string;
  investTag: string;
  projectName: string;
  inputs: Token[]; // auto unwrapped tokens
  rewards: Token[]; // auto unwrapped tokens
  valueUSD: number;
  claimableUSD: number;
  harvestUSD: number;
  totalInvested: number;
  totalWithdrawn: number;
  tag: string;
  amounts: number[];
  meta: string[];
  pnl: number;
  roi: number;
  changes: ParsedPositionChange[];
  snapshots: ParsedPositionSnapshot[];
}
