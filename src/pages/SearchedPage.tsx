import { MaxWidth } from "components/layout/MaxWidth";
import { Header } from "components/layout/Header";
import { useMatch } from "react-router-dom";
import { PositionsList } from "components/features/positionsList";
import { HotPositions } from "components/features/hotPositions";

export const SearchedPage = () => {
  const match = useMatch("/:address");
  const address = match?.params.address ?? "";
  return (
    <div className="pb-40">
      <Header address={address} />
      <MaxWidth>
        <PositionsList address={address} />
        <hr className="my-10" />
        <HotPositions />
      </MaxWidth>
    </div>
  );
};
