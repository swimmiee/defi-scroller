import { Link, generatePath } from "react-router-dom";
import { BiLink } from "react-icons/bi";
import { TokenAndAmount } from "./TokenAndAmount";
import { ParsedPosition } from "interfaces/parsed-position.interface";
import { SCROLL_PROJECTS } from "configs/projects.config";
import { PanelBox } from "components/PanelBox";
import { ProjectIcon } from "components/icon/ProjectIcon";
import { ROUTES } from "Router";
import { ellipsisAddr } from "utils/ellipsisAddr";
import { TokenIcon } from "components/icon/TokenIcon";
import { ChangeTransactionItem } from "./ChangeItem";
import { NoChange } from "./NoChange";

interface PositionInfoProps {
  position: ParsedPosition;
}

export const PositionInfo = ({
  position: { amounts, owner, inputs, rewards, projectName, changes },
}: PositionInfoProps) => {
  const project = SCROLL_PROJECTS.find((p) => p.name === projectName)!;
  return (
    <div>
      <p className="mb-3 text-2xl font-medium">Position Info</p>
      <PanelBox noPadding>
        <div className="pt-6 px-6">
          {/* TITLE */}
          <div className="flex items-center justify-between gap-2">
            <ProjectIcon project={project} size="xxl" mobileSize="xl" />
            <div className="flex-1">
              <div className="flex gap-2">
                <p className="text-xl font-medium flex-1">
                  {project.name}&nbsp;
                  {inputs.map((t) => t.symbol).join("+")}
                </p>
                <div className="flex mt-0.5">
                  {inputs.map((t, i) => (
                    <TokenIcon key={i} size="md" token={t} />
                  ))}
                </div>
              </div>
              <p className=" text-neutral-500 mt-1">Scroll</p>
            </div>
          </div>

          <hr className="my-4 border-dashed" />

          {/* OWNER */}
          <div>
            <p className="text-lg text-neutral-700"> Owner</p>
            <Link
              to={generatePath(ROUTES.SEARCHED, { address: owner })}
              className="flex mt-2 gap-2 items-center"
            >
              <p className="ml-1 text-lg mt-px text-neutral-700 underline underline-offset-2">
                {ellipsisAddr(owner, 12, 8)}
              </p>
              <BiLink size={24} />
            </Link>
          </div>

          <hr className="my-4 border-dashed" />

          {/* CURRENT POSITION VALUE */}
          <div className="flex flex-col gap-4 pb-5">
            <p className="text-xl text-neutral-700">Position Value</p>
            {inputs.map((t, i) => (
              <TokenAndAmount key={i} token={t} amount={amounts[i]} />
            ))}
          </div>
          {/* CURRENT CLAIMABLE VALUE */}
          {rewards.length > 0 && (
            <div className="flex flex-col gap-2 mb-1 py-4 border-t border-neutral-400 border-dashed">
              <p className="md:text-t-lg text-neutral-700"> Claimable</p>
              {rewards.map((t, i) => (
                <TokenAndAmount
                  key={i}
                  token={t}
                  amount={amounts[i + inputs.length]}
                />
              ))}
            </div>
          )}

          <hr className="my-4 border-dashed" />
          {/* CHANGES */}

          <p className="text-xl text-neutral-700 mb-2">Position Changes</p>
          {changes.length > 0 ? (
            <div className="-mx-6">
              {changes.map((change, i) => (
                <ChangeTransactionItem key={i} change={change} />
              ))}
            </div>
          ) : (
            <NoChange />
          )}
        </div>
      </PanelBox>
    </div>
  );
};
