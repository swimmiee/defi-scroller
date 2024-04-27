import { PanelBox } from "components/PanelBox";
import { ParsedPosition } from "interfaces/parsed-position.interface";
import { PoolView } from "../positionsList/PoolView";
import { TrendsGraph } from "components/TrendsGraph";
import { dollar, percFormat } from "utils/formatter";
import { Link, generatePath } from "react-router-dom";
import { ROUTES } from "Router";
import { getTrendColor } from "utils/getTrendColor";

interface HotPositionItemProps {
  position: ParsedPosition;
}

export const HotPositionItem = ({ position }: HotPositionItemProps) => {
  return (
    <Link
      state={{ position }}
      to={generatePath(ROUTES.POSITION, { id: position.id })}
    >
      <PanelBox className="p-6">
        <PoolView
          invest={{
            inputTokens: position.inputs,
            project: position.projectName,
            meta: {},
          }}
        />
        <div className="my-3 flex gap-2 items-end">
          <p className="text-3xl ">{dollar(position.valueUSD)}</p>
          {position.pnl !== null && (
            <div
              className="flex items-center gap-0.5 "
              style={{ color: getTrendColor(position.roi ?? 0) }}
            >
              <p className="text-lg mt-px">
                {!position.pnl ? "" : position.pnl > 0 ? "▲" : "▼"}
              </p>
              {Boolean(position.roi) && (
                <p className="text-lg">
                  {percFormat(Math.abs(position.roi!))} (
                  {dollar(position.pnl, true)})
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex">
          <div className="h-12 w-72">
            <TrendsGraph
              maxLength={7}
              data={position.snapshots.map((s) => ({
                date: s.date,
                value: s.valueUSD,
              }))}
            />
          </div>
        </div>
      </PanelBox>
    </Link>
  );
};
