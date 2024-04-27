import { cn } from "utils/cn";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

export interface TableHeaderColumn {
  label: string;
  value?: string;
  sortable?: boolean;
  hideOnMobile?: boolean;
  align?: "left" | "center" | "right";
}
interface TableHeaderProps {
  columns: TableHeaderColumn[];
  sortKey: {
    item: string;
    asc: boolean;
  } | null;
  sort?: (value: string) => void;
  className?: string;
}

export const TableHeader = ({
  columns,
  sortKey,
  sort,
  className,
}: TableHeaderProps) => {
  return (
    <div
      className={cn(
        "px-3 md:px-6 border-b border-neutral-200 h-7 md:h-10 text-t-sm",
        className
      )}
    >
      {columns.map((item) => {
        const { label, value, sortable, align } = item;
        const selected = sortKey?.item === value;
        const columnClass = cn(
          !selected && "text-neutral-500 hover:text-neutral-900",
          "flex items-center group gap-1 flex-1 my-auto",
          item.hideOnMobile && "max-md:hidden",
          align === "center"
            ? "justify-center"
            : align === "right"
            ? "justify-end"
            : "justify-start"
        );

        if (sortable && !value)
          throw new Error("value is required for sortable columns");
        return sortable ? (
          <button
            key={value}
            className={columnClass}
            onClick={sort ? () => sort(value!) : undefined}
          >
            <p className={"flex items-center gap-1"}>{label}</p>
            {selected && sortKey?.asc ? <FaCaretUp /> : <FaCaretDown />}
          </button>
        ) : (
          <div key={label} className={columnClass}>
            <p className={"text-neutral-500"}>{label}</p>
          </div>
        );
      })}
    </div>
  );
};
