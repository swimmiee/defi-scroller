import { Tooltip } from "components/Tooltip";
import { dollar, percFormat } from "utils/formatter";
import { getTrendColor } from "utils/getTrendColor";

interface ReportItemProps {
  title: string;
  value: number;
  info?: string;
  color?: string;
  negative?: true;
  percentage?: true;
}
export const ReportItem = ({
  title,
  value,
  info,
  color,
  negative,
  percentage,
}: ReportItemProps) => {
  color = color ?? getTrendColor(value * (negative ? -1 : 1));
  return (
    <div className="text-lg flex items-center justify-center h-20 flex-col rounded-lg bg-gray-50">
      <div className="flex items-center justify-center gap-2">
        <p>{title}</p>
        {info && (
          <Tooltip size={20} className="w-60 text-sm text-center">
            {info}
          </Tooltip>
        )}
      </div>
      <p className="text-xl" style={{ color }}>
        {percentage ? percFormat(value) : dollar(value)}
      </p>
    </div>
  );
};
