import { Header } from "../components/layout/Header";
import { Search } from "../components/features/Search";
import { MaxWidth } from "components/layout/MaxWidth";
import { HotPositions } from "components/features/hotPositions";
import { useEffect } from "react";
import { queryTopPositions } from "components/features/hotPositions/queryTopPositions";

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
