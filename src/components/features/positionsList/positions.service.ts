import { queryMyPositions } from "api/queryMyPositions";
import { SCROLL_PROJECTS } from "configs/projects.config";
import { useEffect, useState } from "react";
import { parsePosition } from "./parsePosition";
import { ParsedPosition } from "interfaces/parsed-position.interface";

export const usePositions = (address: string) => {
  const [positions, setPositions] = useState<ParsedPosition[]>();

  useEffect(() => {
    setPositions(undefined);
    if (!address) return;

    queryMyPositions(address, SCROLL_PROJECTS).then((res) => {
      const allPos = res.flatMap((positions, i) => {
        return positions.map((position) =>
          parsePosition(address, SCROLL_PROJECTS[i], position)
        );
      });
      setPositions(allPos.filter(Boolean) as ParsedPosition[]);
      return;
    });

  }, [address]);

  return positions;
};
