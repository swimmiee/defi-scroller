import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dollar } from "utils/formatter";
import { getTrendColor } from "utils/getTrendColor";

export interface TrendsGraphData {
  date: string;
  value: number;
}
interface TrendsGraphProps {
  data: TrendsGraphData[];
  maxLength?: number;
  dot?: false;
}
export const TrendsGraph = ({ data, maxLength, dot }: TrendsGraphProps) => {
  const min = Math.min(...data.map((d) => d.value)) * 0.996;
  const max = Math.max(...data.map((d) => d.value)) * 1.004;

  const width = maxLength ? (100 * (data.length - 1)) / (maxLength - 1) : 100;
  const isPositive = data.length === 0 ? false :data[0].value < data[data.length - 1].value;
  const color = getTrendColor(isPositive);
  return (
    <ResponsiveContainer className="z-10" width={width + "%"} height="100%">
      <LineChart width={300} height={64} data={data}>
        <Tooltip
          cursor={{ fill: "transparent" }}
          content={(props) => {
            return (
              <div className="z-50 bg-background rounded-md p-1.5 border border-neutral-200 bg-white">
                <p className="text-t-sm">{props.label}</p>
                <p className="text-t-md text-center" style={{ color }}>
                  {dollar(props.payload?.[0]?.value as number)}
                </p>
              </div>
            );
          }}
        />
        <XAxis dataKey="date" tickFormatter={() => ""} hide />
        <YAxis
          hide
          domain={[min, max]}
          type="number"
          tickCount={2}
          tickFormatter={() => ""}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          dot={dot}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
