import { actionColorMap } from "configs/action.color";
import { ParsedPosition, changeValueActions } from "interfaces/parsed-position.interface";
import { productSum } from "utils/productSum";

export interface GraphData {
  date: Date;
  value: number;
  hold: number;
}

export interface GraphRefLine {
  timestamp: number;
  title: string;
  color: string;
}

export const useGraphData = (p: ParsedPosition) => {
  const graphData: GraphData[] = [];
  let holdAmounts = p.snapshots[0].amounts;

  const referenceLines: GraphRefLine[] = [];

  const changes = p.changes.filter(
    (c) => c.timestamp >= p.snapshots[0].timestamp
  );

  let changeIterator = 0;
  let harvest = 0;
  for (const snapshot of p.snapshots) {
    while (changeIterator < changes.length) {
      const change = changes[changeIterator];
      if (change.timestamp > snapshot.timestamp) break;
      if (change.action === "Harvest") {
        harvest -= change.dValueUSD;
        referenceLines.push({
          timestamp: change.timestamp.getTime(),
          title: change.action,
          color: actionColorMap[change.action],
        });
      }
      if (changeValueActions.includes(change.action)) {
        holdAmounts = change.afterAmounts;
        referenceLines.push({
          timestamp: change.timestamp.getTime(),
          title: change.action,
          color: actionColorMap[change.action],
        });

        // 최초 snapshot이 change에 의해 생성된 snapshot인 경우 (change.timestamp == snapshot.timestamp)
        // graph에 change에 대한 점은 또 추가하지 않는다
        if (change.timestamp > snapshot.timestamp) {
          const value =
            productSum(change.afterAmounts, change.prices) + harvest;
          graphData.push({
            date: snapshot.timestamp,
            value,
            hold: value,
          });
        }
      }
      changeIterator++;
    }

    const holdValue = productSum(holdAmounts, snapshot.prices);
    graphData.push({
      date: snapshot.timestamp,
      value: snapshot.valueUSD + harvest,
      hold: holdValue,
    });
  }

  return { graphData, referenceLines };
};
