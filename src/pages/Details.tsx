import { PositionDetails } from "components/features/details";
import { Header } from "components/layout/Header";
import { MaxWidth } from "components/layout/MaxWidth";

export const PositionDetailsPage = () => {
  // const { id } = useMatch(ROUTES.POSITION)?.params as { id: string };

  return (
    <div className="pb-40">
      <Header short address="" />
      <div className="h-12" />
      <MaxWidth>
        <PositionDetails />
      </MaxWidth>
    </div>
  );
};
