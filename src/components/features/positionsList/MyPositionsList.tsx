import { TrendsGraph } from "components/TrendsGraph";
import { TableHeader, TableHeaderColumn } from "components/table/TableHeader";
import { TableRow } from "components/table/TableRow";
import { TableWrapper } from "components/table/TableWrapper";
import { ParsedPosition } from "interfaces/parsed-position.interface";
import { generatePath } from "react-router-dom";
import { cn } from "utils/cn";
import { dollar, percFormat } from "utils/formatter";
import { getTrendColor } from "utils/getTrendColor";
import { PoolView } from "./PoolView";
import { ROUTES } from "Router";

const columns: TableHeaderColumn[] = [
  { label: "Pool", value: "pool" },
  {
    label: "Current Value",
    value: "valueUSD",
  },
  {
    label: "Profit & Loss",
    value: "pnl",
  },
  {
    label: "Claimable",
    value: "claimableUSD",
  },
  { label: "Last 7 Days", value: "history", align: "center" },
];

interface MyPositionProps {
  data: ParsedPosition[];
}

export const MyPositionsList = ({ data }: MyPositionProps) => {
  return (
    <TableWrapper
      xScrollOnMobile
      className="mt-4 [&>*]:min-w-[820px] [&>*]:grid-cols-[240px_1fr_1.2fr_1fr_212px]"
    >
      <TableHeader columns={columns} sortKey={null} />
      {data.map((pos, i) => {
        const color = getTrendColor(pos.pnl);
        return (
          <TableRow
            key={i}
            linkTo={
              pos.id ? generatePath(ROUTES.POSITION, { id: pos.id }) : undefined
            }
            state={{ position: pos }}
          >
            <PoolView
              invest={{
                inputTokens: pos.inputs,
                project: pos.projectName,
                meta: {},
              }}
            />
            {/* Current Value */}
            <div className="flex-center">{dollar(pos.valueUSD)}</div>
            {/* P&L */}
            <div className="flex-center" style={{ color }}>
              <p className="text-l-md mr-1 mt-[3px]">
                {!pos.pnl ? "" : pos.pnl > 0 ? "▲" : "▼"}
              </p>
              <p className="text-t-md">
                {percFormat(Math.abs(pos.roi))}({dollar(pos.pnl, true)})
              </p>
            </div>
            {/* Claimable */}
            <div
              className={cn(
                "flex-center",
                pos.claimableUSD === 0 ? "text-neutral-500" : ""
              )}
            >
              {dollar(pos.claimableUSD)}
            </div>
            <div className="h-full justify-end">
              <TrendsGraph
                maxLength={7}
                data={pos.snapshots.map((s) => ({
                  date: s.date,
                  value: s.valueUSD,
                }))}
              />
            </div>
          </TableRow>
        );
      })}
    </TableWrapper>
  );
};
