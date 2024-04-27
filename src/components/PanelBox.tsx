import { cn } from "utils/cn";

interface PanelBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  noXPadding?: boolean;
  noPadding?: boolean;
}
export const PanelBox = ({
  className,
  noXPadding,
  noPadding,
  ...props
}: PanelBoxProps) => {
  const padding = noPadding
    ? ""
    : noXPadding
    ? "py-4 md:py-6"
    : "p-4 md:p-6 md:pt-5";
  return (
    <div
      className={cn(
        "flex flex-col overflow-x-hidden bg-white border border-neutral-200 rounded-lg md:rounded-2xl",
        padding,
        className
      )}
      {...props}
    />
  );
};
