import {
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dateFormat, dollar } from "utils/formatter";
import { TREND_LIGHTGREY, getTrendColor } from "utils/getTrendColor";
import { GraphData, GraphRefLine } from "./useGraphData";

interface PositionDetailsGraphProps {
  data: GraphData[];
  lines: GraphRefLine[];
}

export const PositionDetailsGraph = ({
  data,
  lines,
}: PositionDetailsGraphProps) => {
  const pnl = data.length > 0 ? data[data.length - 1].value - data[0].value : 0;
  const color = getTrendColor(pnl);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={300}
        height={64}
        data={data.map((d) => ({
          ...d,
          date: d.date.getTime(),
        }))}
        margin={{ left: 28, right: 40, top: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <ReferenceLine strokeDasharray="3 3" y={data[0].value} />

        <Tooltip
          content={(props) => {
            if (!props.label) return null;
            const date = dateFormat(new Date(+props.label as number), {
              date: true,
            });
            return (
              <div className="bg-background rounded-md p-1.5 border border-neutral-200">
                <p className="text-t-sm">{date}</p>
                <p className="text-t-md text-center" style={{ color }}>
                  {dollar(props.payload?.[1]?.value as number)}
                </p>
                <p
                  className="text-t-md text-center"
                  style={{ color: props.payload?.[0]?.color }}
                >
                  {dollar(props.payload?.[0]?.value as number)}
                </p>
              </div>
            );
          }}
        />
        <XAxis
          dataKey="date"
          tickFormatter={(d) => dateFormat(d, { date: true, year: false })}
          axisLine={false}
        />
        <YAxis
          hide
          domain={["dataMin", "dataMax"]}
          type="number"
          tick={false}
          axisLine={false}
        />

        <Line
          type="monotone"
          dataKey="hold"
          stroke={TREND_LIGHTGREY}
          strokeWidth={1.2}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
        />

        {lines.map((l, i) => (
          <ReferenceLine
            key={i}
            x={l.timestamp}
            label={l.title}
            stroke={"#e0e0e0"}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
