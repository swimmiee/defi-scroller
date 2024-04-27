import { cn } from "utils/cn";

interface TableWrapperProps {
  children: React.ReactNode;
  className?: string;
  xScrollOnMobile?: boolean;
}

export const TableWrapper = ({
  children,
  xScrollOnMobile,
  className,
}: TableWrapperProps) => {
  return (
    <div
      className={cn(
        xScrollOnMobile && "overflow-x-scroll max-w-full",
        "max-md:pb-2"
      )}
    >
      <div
        className={cn(
          "flex flex-col md:bg-white md:border md:border-neutral-200 rounded-xl first:[&>*]:rounded-t-xl last:[&>*]:rounded-b-xl [&>*]:grid [&>*]:gap-2",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
