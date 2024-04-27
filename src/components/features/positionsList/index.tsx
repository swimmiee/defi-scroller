import { ellipsisAddr } from "utils/ellipsisAddr";
import { MyPositionsList } from "./MyPositionsList";
import { usePositions } from "./positions.service";

interface PositionsListProps {
  address: string;
}

export const PositionsList = ({ address }: PositionsListProps) => {
  const positions = usePositions(address);

  return (
    <div>
      <h2 className="text-3xl font-medium">
        Positions of Wallet {ellipsisAddr(address, 10, 4)}
      </h2>
      {positions ? (
        <MyPositionsList data={positions} />
      ) : (
        <div className="h-40 flex items-center justify-center">Loading...</div>
      )}
    </div>
  );
};
