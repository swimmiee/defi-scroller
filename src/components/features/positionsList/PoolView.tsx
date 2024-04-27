import { cn } from "utils/cn";
import { Token } from "interfaces/token.interface";
import { SCROLL_PROJECTS } from "configs/projects.config";
import { RowTokenIcons } from "components/icon/RowTokensIcon";
import { Chip } from "components/Chip";

interface PoolViewProps {
  invest: {
    project: string;
    inputTokens: Token[];
    meta: any;
  }; // subset of TokenDto
  size?: "md" | "sm";
}

export const PoolView = ({ invest, size = "md" }: PoolViewProps) => {
  const project = SCROLL_PROJECTS.find((p) => p.name === invest.project)!;
  const poolName = invest.inputTokens.map((t) => t.symbol).join("+");

  return (
    <div className="flex items-center gap-2">
      <div className={cn("flex-center")}>
        <RowTokenIcons size={size} tokens={invest.inputTokens} />
      </div>
      <div className="flex flex-col gap-0.5">
        <p
          className={cn(
            "max-md:mt-0.5 text-t-sm",
            size === "md" && "md:text-t-md"
          )}
        >
          {poolName}
        </p>
        {/* CHIPS */}
        <div className="max-md:hidden flex">
          <Chip size="md" color="secondary">
            <img className="w-3 h-3 rounded-full" src={project.logoURI} />
            <p> {invest.project}</p>
          </Chip>
        </div>
        {/* Just project name in text in case of mobile */}
        <p className="hidden max-md:block text-l-sm text-neutral-500 -mt-0.5">
          {invest.project}
        </p>
      </div>
    </div>
  );
};
