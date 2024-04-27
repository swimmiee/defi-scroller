import { TREND_LIGHTGREY, getTrendColor } from "utils/getTrendColor";
import { useGraphData } from "./useGraphData";
import { PositionDetailsGraph } from "./PositionDetailsGraph";
import { ReportItem } from "./ReportItem";
import { dateFormat } from "utils/formatter";
import { ChartLegend } from "./ChartLegend";
import { ParsedPosition } from "interfaces/parsed-position.interface";
import { PanelBox } from "components/PanelBox";

interface PositionChartProps {
  position: ParsedPosition;
}
export const PositionChart = ({ position }: PositionChartProps) => {
  const color = getTrendColor(position.pnl);
  const data = useGraphData(position);

  const hold = data.graphData[data.graphData.length - 1].hold;
  const value = position.valueUSD;

  const firstSnapshot = position.snapshots[0];
  const lastSnapshot = position.snapshots[position.snapshots.length - 1];

  const estimatedAPR =
    (((value + position.harvestUSD) / hold - 1) * 365 * 24 * 60 * 60 * 1000) /
    (lastSnapshot.timestamp.getTime() - firstSnapshot.timestamp.getTime());

  return (
    <div className="flex-1">
      <p className="mb-3 text-2xl font-medium">
        Position Chart
      </p>
      <PanelBox className="max-md:w-full !overflow-visible">
        <div className="flex max-md:flex-col gap-1 md:gap-4 text-l-lg text-neutral-500">
          <ChartLegend
            color={color}
            title="Current Value with Rewards"
            tooltip="The total current value of this position, including all rewards earned from it."
          />
          <ChartLegend
            color={TREND_LIGHTGREY}
            title="Value if not invested"
            tooltip="The hypothetical current value of your assets if you had not invested and simply held onto them."
          />
        </div>
        <div className="my-4 md:my-3 h-60 md:h-[320px] -mx-3">
          <PositionDetailsGraph
            data={data.graphData}
            lines={data.referenceLines}
          />
        </div>

        <hr className="mb-6 border-neutral-200" />

        <div className="flex flex-col gap-2 [&>div]:flex [&>div]:justify-between">
          <div className="flex flex-col">
            <div className="flex justify-between items-end gap-2">
              <p className="text-xl font-medium">
                ✏️ Weekly Report
              </p>
              <p className=" text-neutral-500">
                🗓️{" "}
                {firstSnapshot.date === lastSnapshot.date
                  ? dateFormat(firstSnapshot.timestamp, {
                      date: true,
                      year: false,
                    })
                  : `${dateFormat(firstSnapshot.timestamp, {
                      date: true,
                      year: false,
                    })} - ${dateFormat(lastSnapshot.timestamp, {
                      date: true,
                      year: false,
                    })}`}
              </p>
            </div>

            <div className="flex flex-col gap-2 md:gap-4 [&>*]:gap-2 [&>*]:md:gap-4 mt-4">
              <div className="grid grid-cols-2">
                <ReportItem
                  title="Last Value"
                  info={dateFormat(firstSnapshot.timestamp)}
                  color="#000"
                  value={position.snapshots[0].valueUSD}
                />
                <ReportItem
                  title="Current Value"
                  color={getTrendColor(
                    value + position.harvestUSD - firstSnapshot.valueUSD
                  )}
                  value={value}
                />
              </div>

              <div className="grid grid-cols-3">
                <ReportItem title="Invested" value={position.totalInvested} />
                <ReportItem title="Harvested" value={position.harvestUSD} />
                <ReportItem
                  title="Withdrawn"
                  value={position.totalWithdrawn}
                  negative
                />
              </div>

              <div className="grid grid-cols-2">
                <ReportItem
                  title="Profit & Loss"
                  value={position.pnl}
                  info="Current Position Value <br/>- Last Position Value"
                />
                <ReportItem title="ROI" value={position.roi} percentage />
              </div>

              <div className="grid grid-cols-2">
                <ReportItem
                  color={getTrendColor(0)}
                  info="The hypothetical value of your assets if you had not invested and simply held onto them."
                  title="If Just HODL"
                  value={hold}
                />
                <ReportItem
                  title="Estimated APR"
                  info={
                    "Annual Percentage Rate based on current value and hold value"
                  }
                  value={estimatedAPR}
                  percentage
                />
              </div>
            </div>
          </div>
        </div>
      </PanelBox>
    </div>
  );
};
