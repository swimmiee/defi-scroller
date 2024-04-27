import { ParsedPosition } from "interfaces/parsed-position.interface";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { HeadValue } from "./HeadValue";
import { PositionChart } from "./positionChart";
import { PositionInfo } from "./info";

export const PositionDetails = () => {
  const loc = useLocation();
  const [position, _setPosition] = useState<ParsedPosition>(
    loc.state?.position || undefined
  );

  if (!position) return null;
  return (
    <div className="flex flex-col">
      <HeadValue
        title="Total Value Including Rewards"
        total={position.valueUSD}
        pnl={position.pnl}
        roi={position.roi}
      />

      <div className="mt-8 gap-8 grid grid-cols-[420px_1fr]">
        <PositionInfo position={position} />
        <PositionChart position={position} />
        {/* <ChangeTransactions changes={position.changes} chainId={chainId} /> */}
      </div>
    </div>
  );
};
