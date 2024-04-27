import dayjs from "dayjs";
import { formatUnits, getAddress } from "ethers";
import { ProjectInfoWithInvests } from "interfaces/invest-project-info.interface";
import {
  ParsedPosition,
  ParsedPositionChange,
  ParsedPositionSnapshot,
  PositionChangeAction,
} from "interfaces/parsed-position.interface";
import { findTokens } from "utils/findTokens";
import { productSum } from "utils/productSum";
import { MyPositionQueryResult } from "interfaces/myposition.query.interface";

export const parsePosition = (
  owner: string,
  project: ProjectInfoWithInvests,
  position: MyPositionQueryResult
): ParsedPosition | null => {
  const viewDates = 7;
  const investment = project.invests.find(
    (i) => i.idAtSubgraph === position.investment.id
  );
  if (!investment) return null;

  const tokens = findTokens(
    investment.inputAssets.concat(investment.rewardAssets).map(getAddress),
    project.autoWrap
  );

  if (!tokens.every(Boolean)) return null;

  const toReadable = (amounts: string[]) =>
    amounts.map((a, i) => +formatUnits(a, tokens[i].decimals));

  let claimableUSD = 0;

  const parsedSnapshots: ParsedPositionSnapshot[] = [];
  const nowUtcDate = dayjs(
    +position.snapshots[position.snapshots.length - 1].blockTimestamp * 1000
  ).format("YYYY-MM-DD");
  const dateAtLeast = dayjs(nowUtcDate)
    .subtract(viewDates, "day")
    .format("YYYY-MM-DD");

  position.snapshots
    .map(({ blockTimestamp, ...s }) => ({
      ...s,
      timestamp: +blockTimestamp * 1000,
      date: dayjs(+blockTimestamp * 1000).format("YYYY-MM-DD"),
    }))
    .filter((s) => s.date >= dateAtLeast) // 여기까지 날짜 역순으로 정렬되어있음
    .reduce((acc, s, index, arr) => {
      // 첫날의 첫 snapshot은 무조건 가져온다.
      if (index < arr.length - 1) {
        // 7일치만 가져오기
        if (parsedSnapshots.length === viewDates) return acc;
        // 중복된 날짜는 제외, 각 날짜별로 마지막에 기록된 스냅샷만 남김
        if (acc === s.date) return acc;
      }

      const snapshotAmounts = toReadable(s.amounts);
      const dayDiff = dayjs(nowUtcDate).diff(dayjs(s.date), "day");
      const prices = tokens.map((t) => {
        t.priceHistory[t.priceHistory.length - 1] = t.priceUSD;
        if (t.priceHistory) {
          // TODO: APPLY price of the day
          return (
            t.priceHistory[t.priceHistory.length - 1 - dayDiff] ||
            t.priceHistory[0]
          );
        }
        return 0;
      });

      const valueUSD = productSum(snapshotAmounts, prices);

      // 첫날의 snapshot은 그날의 첫 snapshot으로 기록
      if (parsedSnapshots.length > 0 && parsedSnapshots[0].date === s.date) {
        parsedSnapshots.shift();
      }

      parsedSnapshots.push({
        date: s.date,
        timestamp: new Date(s.timestamp),
        amounts: snapshotAmounts,
        prices,
        valueUSD,
      });

      return s.date;
    }, "");

  const currAmounts = toReadable(position.amounts);
  const currentPrices = parsedSnapshots[parsedSnapshots.length - 1].prices;
  const valueUSD = productSum(currAmounts, currentPrices);

  const parsedChanges: ParsedPositionChange[] = [];
  // TODO: APPLY price of the day
  position.changes.forEach((c) => {
    const timestamp = new Date(+c.blockTimestamp * 1000);
    const dayDiff = dayjs(nowUtcDate).diff(dayjs(timestamp), "day");
    const prices = tokens.map((t) => {
      t.priceHistory[t.priceHistory.length - 1] = t.priceUSD;
      if (t.priceHistory) {
        // TODO: APPLY price of the day
        return (
          t.priceHistory[t.priceHistory.length - 1 - dayDiff] ||
          t.priceHistory[0]
        );
      }
      return 0;
    });

    const afterAmounts = toReadable(c.afterAmounts);
    const afterValueUSD = productSum(afterAmounts, prices);
    const dAmounts = toReadable(c.dAmounts);
    const dValueUSD = productSum(dAmounts, prices);

    parsedChanges.push({
      timestamp,
      transactionHash: c.transactionHash,
      action: c.action,
      dAmounts,
      dValueUSD,
      afterAmounts,
      afterValueUSD,
      prices,
    });
  });

  let harvestUSD = 0;
  let totalInvested = 0;
  let totalWithdrawn = 0;

  parsedChanges.forEach((c) => {
    if (c.timestamp <= parsedSnapshots[0].timestamp) return;
    switch (c.action) {
      case PositionChangeAction.Deposit:
      case PositionChangeAction.Receive:
        totalInvested += c.dValueUSD;
        return;
      case PositionChangeAction.Withdraw:
      case PositionChangeAction.Liquidate:
      case PositionChangeAction.Send:
        totalWithdrawn -= c.dValueUSD; // dValueUSD is negative
        return;
      case PositionChangeAction.Harvest:
        harvestUSD -= c.dValueUSD;
        return;
      default:
        return;
    }
  });

  const netInvested =
    parsedSnapshots[0].valueUSD + totalInvested - totalWithdrawn;
  const pnl = valueUSD + harvestUSD - netInvested;
  const roi = valueUSD === 0 ? 0 : (valueUSD + harvestUSD) / netInvested - 1;

  return {
    id: position.id,
    owner,
    investAddress: investment.address,
    investTag: investment.tag,
    projectName: project.name,
    inputs: tokens.slice(0, investment.inputAssets.length),
    rewards: tokens.slice(investment.inputAssets.length),
    valueUSD,
    claimableUSD,
    harvestUSD,
    totalInvested,
    totalWithdrawn,
    tag: position.tag,
    amounts: currAmounts,
    meta: position.meta,
    pnl,
    roi,
    changes: parsedChanges,
    snapshots: parsedSnapshots,
  };
};
