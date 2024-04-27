import { cn } from "utils/cn";

interface ChipProps {
  className?: string;
  size: "md" | "lg";
  color: "primary" | "secondary" | "default";
  children: React.ReactNode | React.ReactNode[];
}

export const Chip = ({ className, size, color, children }: ChipProps) => {
  const sizeProps =
    size === "md" ? "text-xs h-[18px] px-1 rounded" : "lg" ? "text-sm h-6 px-2 rounded" : "";
  const colorProps =
    color === "primary"
      ? "bg-primary text-neutral-900"
      : color === "secondary"
      ? "bg-neutral-100 text-neutral-600"
      : "bg-white text-neutral-900";
  return (
    <span
      className={cn(
        colorProps,
        sizeProps,
        "flex items-center gap-0.5 border",
        className
      )}
    >
      {children}
    </span>
  );
};
