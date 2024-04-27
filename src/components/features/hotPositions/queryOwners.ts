import { queryAllPositions } from "api/queryAllPositions";
import { SCROLL_PROJECTS } from "configs/projects.config";

export const queryOwners = () => {
  const today = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 7);

  queryAllPositions(SCROLL_PROJECTS, from, today).then((res) => {
    // owner => [SyncSwap, Ambient, Uniswap, total]
    const ownerCount: Record<string, [number, number, number, number]> = {};
    for (let i = 0; i < res.length; i++) {
      const project = res[i];
      for (const position of project) {
        ownerCount[position.owner] = ownerCount[position.owner] || [0, 0, 0, 0];
        ownerCount[position.owner][i]++;
        ownerCount[position.owner][3]++;
      }
    }

    const sorted = Object.entries(ownerCount).sort((a, b) => b[1][3] - a[1][3]);

    const top10 = sorted.slice(0, 10);
    const allPos = sorted
      .slice(10)
      .map(([addr, [a, b, c]]) => {
        const aa = Number(a > 0);
        const bb = Number(b > 0);
        const cc = Number(c > 0);
        return [addr, aa + bb + cc] as const;
      })
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    console.log(
      JSON.stringify(
        [...top10.map((t) => t[0]), ...allPos.map((t) => t[0])],
        null,
        2
      )
    );
  });
};
