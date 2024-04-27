import { dollar, percFormat } from "utils/formatter";
import { getTrendColor } from "utils/getTrendColor";

interface HeadValueProps {
  title: string;
  total: number | null;
  pnl: number | null;
  roi: number | null;
}
export const HeadValue = ({ title, total, pnl, roi }: HeadValueProps) => {
  return (
    <div className="flex flex-col">
      <p className="text-xl">{title}</p>
      <div className="flex gap-2 items-end">
        <p className="text-5xl font-medium">
          {total !== null ? dollar(total) : "-"}
        </p>
        {pnl !== null && (
          <div
            className="flex items-center gap-0.5 -mb-1"
            style={{ color: getTrendColor(roi ?? 0) }}
          >
            <p className="text-lg mt-px">{!pnl ? "" : pnl > 0 ? "▲" : "▼"}</p>
            {Boolean(roi) && (
              <p className="text-lg">
                {percFormat(Math.abs(roi!))} ({dollar(pnl, true)})
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
