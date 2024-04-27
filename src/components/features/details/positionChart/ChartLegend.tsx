import { Tooltip } from "components/Tooltip";


interface ChartLegendProps {
  color: string;
  title: string;
  tooltip: string;
}
export const ChartLegend = ({ color, title, tooltip }: ChartLegendProps) => {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      <div className="flex flex-1 gap-1 items-center">
        <p>{title}</p>
        <Tooltip direction="bottom" className="w-56">
          {tooltip}
        </Tooltip>
      </div>
    </div>
  );
};
