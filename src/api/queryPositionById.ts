import { querySubgraph } from "./querySubgraph";
import { MyPositionQueryResult } from "interfaces/myposition.query.interface";
import { SCROLL_PROJECTS } from "configs/projects.config";

export const queryPositionById = async (
  projIdx: number,
  id: string
): Promise<MyPositionQueryResult | null> => {
  const project = SCROLL_PROJECTS[projIdx];

  return querySubgraph<{ position: MyPositionQueryResult }>(
    project.subgraphUrl,
    `query {
      position (id: "${id}"){
        id
        tag
        owner
        amounts
        meta
        investment { id }

        changes(
          orderBy: blockTimestamp
          orderDirection: asc
        ){
          action
          dAmounts
          afterAmounts
          blockTimestamp
          transactionHash
        }

        snapshots(
          orderBy: blockTimestamp
          orderDirection: asc
        ){
          blockTimestamp
          amounts
        }
      }
    }`
  ).then((res) => (res ? res.data.position : null));
};
