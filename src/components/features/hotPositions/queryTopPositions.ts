import { queryAllPositions } from "api/queryAllPositions";
import { SCROLL_PROJECTS } from "configs/projects.config";
import { formatUnits, getAddress } from "ethers";
import { findTokens } from "utils/findTokens";
import { productSum } from "utils/productSum";

export const queryTopPositions = () => {
  const today = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 1);

  queryAllPositions(SCROLL_PROJECTS, from, today).then((res) => {
    const plist: any[] = [];
    for (let i = 0; i < res.length; i++) {
      const project = SCROLL_PROJECTS[i];
      const positions = res[i];
      for (const position of positions) {
        const investment = project.invests.find(
          (i) => i.idAtSubgraph === position.investment.id
        )!;
        const tokens = findTokens(
          investment.inputAssets
            .concat(investment.rewardAssets)
            .map(getAddress),
          project.autoWrap
        );

        const posVal = productSum(
          tokens.map((t, i) => +formatUnits(position.amounts[i], t.decimals)),
          tokens.map((t) => t.priceUSD)
        );

        plist.push([posVal, i, position]);
      }
    }

    const sorted = plist
      .sort((a, b) => b[0] - a[0])
      .filter(
        (item, index, self) =>
          index ===
          self.findIndex((t) => t[2].investment.id === item[2].investment.id)
      )
      .slice(0, 30);
    console.log(
      JSON.stringify(
        sorted.map((t) => {
          return {
            index: t[1],
            pId: t[2].id,
            owner: t[2].owner,
          };
        })
      )
    );
  });
};
