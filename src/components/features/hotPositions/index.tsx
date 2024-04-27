import { useEffect, useState } from "react";
import { hotPositionInfos } from "./hotPositionIds";
import { queryPositionById } from "api/queryPositionById";
import { ParsedPosition } from "interfaces/parsed-position.interface";
import { parsePosition } from "../positionsList/parsePosition";
import { SCROLL_PROJECTS } from "configs/projects.config";
import { HotPositionItem } from "./HotPositionItem";

export const HotPositions = () => {
  const [positions, setPositions] = useState<ParsedPosition[]>();

  useEffect(() => {
    hotPositionInfos.map((info) =>
      queryPositionById(info.index, info.pId).then((position) => {
        if (!position) return;
        const parsed = parsePosition(
          info.owner,
          SCROLL_PROJECTS[info.index],
          position
        );
        if (!parsed || parsed.valueUSD < 100 || parsed.snapshots.length <3) return;
        setPositions((prev) => (prev ? [...prev, parsed] : [parsed]));
      })
    );
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <h2 className="text-3xl font-medium">🔥 Hot Positions</h2>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {positions?.slice(0, 9).map((position, i) => (
          <HotPositionItem key={i} position={position} />
        ))}
      </div>
    </div>
  );
};
