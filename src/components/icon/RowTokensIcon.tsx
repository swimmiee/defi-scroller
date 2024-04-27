
import { TokenIcon } from "./TokenIcon";
import { ChainIcon } from "./ChainIcon";
import { cn } from "utils/cn";
import { Token } from "interfaces/token.interface";
import { CHAIN } from "configs/chain.config";

interface RowTokenIconsProps {
  tokens: Token[];
  size: "md" | "sm";
}
export const RowTokenIcons = ({ tokens, size }: RowTokenIconsProps) => {
  const chain = CHAIN
  return (
    <div className={cn("relative", tokens.length === 1 && "mr-4")}>
      <div className="flex">
        {tokens.map((t, i) => (
          <div
            style={{ zIndex: (i % 2) + 1 }}
            key={i}
            className={
              i > 0
                ? tokens.length >= 3 || size === "sm"
                  ? "-ml-[18%] md:-ml-[9%]"
                  : "-ml-[10%]"
                : ""
            }
          >
            <TokenIcon
              token={t}
              size={tokens.length >= 3 || size === "sm" ? "lg" : "xl"}
              mobileSize={tokens.length >= 3 || size === "sm" ? "md" : "lg"}
            />
          </div>
        ))}
      </div>
      <div
        className={cn(
          "absolute -bottom-0.5 z-10",
          tokens.length > 2
          ? "right-[2px] md:right-[4px]"
          : tokens.length > 1
            ? "right-[0.5px] md:right-[-1px]"
            : "-right-1.5"
        )}
      >
        <ChainIcon chain={chain} size="sm" mobileSize="xs" />
      </div>
    </div>
  );
};
