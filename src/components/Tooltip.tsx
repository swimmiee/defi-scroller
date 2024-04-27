import { RiInformationLine } from "react-icons/ri";
import { cn } from "utils/cn";

export interface TooltipProps {
  size?: number;
  direction?: "top" | "bottom";
  className?: string;
  /**
   * split by <br/>
   */
  children: string;
}
export const Tooltip = ({
  size = 15,
  direction = "top",
  children,
  className,
}: TooltipProps) => {
  return (
    <div className="group relative">
      <RiInformationLine color="#999" size={size} />
      <div
        className={cn(
          className,
          direction === "top"
            ? "bottom-[calc(100%+2px)]"
            : "top-[calc(100%+2px)]",
          "font-light bg-black bg-opacity-60 p-2 rounded z-50 text-white hidden absolute left-1/2 -translate-x-1/2",
          "group-hover:flex group-hover:flex-col gap-1"
        )}
      >
        {children.split("<br/>").map((child, idx) => (
          <p key={idx}>
            {child}
          </p>
        ))}
      </div>
    </div>
  );
};
