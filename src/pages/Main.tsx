import { Header } from "../components/layout/Header";
import { MaxWidth } from "components/layout/MaxWidth";
import { HotPositions } from "components/features/hotPositions";

export const MainPage = () => {
  // useEffect(() => {
  //   queryTopPositions()
  // },[])
  return (
    <div className="pb-40">
      <Header address="" />
      <MaxWidth>
        <HotPositions />
      </MaxWidth>
    </div>
  );
};
