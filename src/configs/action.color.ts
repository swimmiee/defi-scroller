import { PositionChangeAction } from "interfaces/parsed-position.interface";
import {
  TREND_BLUE,
  TREND_GREEN,
  TREND_ORANGE,
  TREND_RED,
} from "utils/getTrendColor";

export const actionColorMap = {
  [PositionChangeAction.Deposit]: TREND_GREEN,
  [PositionChangeAction.Withdraw]: TREND_RED,
  [PositionChangeAction.Harvest]: TREND_ORANGE,
  [PositionChangeAction.Borrow]: TREND_BLUE,
  [PositionChangeAction.Repay]: TREND_GREEN,
  [PositionChangeAction.Liquidate]: TREND_RED,
  [PositionChangeAction.Send]: TREND_RED,
  [PositionChangeAction.Receive]: TREND_GREEN,
  [PositionChangeAction.Stake]: TREND_ORANGE,
  [PositionChangeAction.Unstake]: TREND_RED,
};
