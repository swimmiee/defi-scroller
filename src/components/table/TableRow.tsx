import { useNavigate } from "react-router-dom";
import { cn } from "utils/cn";

interface TableRowProps {
  children: React.ReactNode | React.ReactNode[];
  onClick?: () => void;
  linkTo?: string;
  state?: any;
  height?: "md" | "sm";
  className?: string;
}

export const TableRow = ({
  onClick,
  children,
  linkTo,
  state,
  className,
  height = "md",
}: TableRowProps) => {
  const nav = useNavigate();
  if (linkTo) {
    onClick = () => nav(linkTo!, { state });
  }

  const h = height === "md" ? "h-14 md:h-16" : "h-11 md:h-[55px]";
  return (
    <div
      onClick={onClick}
      className={cn(
        onClick ? "cursor-pointer" : "",
        "[&>div]:flex-1 hover:bg-neutral-50 md:hover:bg-neutral-50 px-3 md:px-6 transition-all duration-300",
        "[&>div]:flex items-center",
        h,
        className
      )}
    >
      {children}
    </div>
  );
};
