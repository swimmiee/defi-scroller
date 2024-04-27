import { ProjectInfoWithInvests } from "interfaces/invest-project-info.interface";
import { getInvestmentIdsString} from "./subgraph.utils";
import { queryAll } from "./querySubgraph";
import { MyPositionQueryResult } from "interfaces/myposition.query.interface";

const _queryMyPositions = async (
  owner: string,
  project: ProjectInfoWithInvests,
): Promise<MyPositionQueryResult[]> => {
  if (!project.subgraphUrl) return [];

  const subgraphInvestmentIds = getInvestmentIdsString(project);

  return queryAll<MyPositionQueryResult>(
    project.subgraphUrl,
    (idCursor: string) => {
      const cursor = idCursor ? `id_gt: "${idCursor}"` : "";
      return `query {
          positions (
            first: 1000
            orderBy: id 
            orderDirection: asc
            where: {
              owner: "${owner.toLowerCase()}"
              closed: false
              investment_in: ${subgraphInvestmentIds}
              ${cursor} 
            }
          ){
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
        }`;
    },
    "positions",
    1000,
    () => true,
    `${project.name}_Positions`
  );
};

export const queryMyPositions = async (
  owner: string,
  projects: ProjectInfoWithInvests[],
): Promise<MyPositionQueryResult[][]> => {
  return Promise.all(
    projects.map((project) =>
      _queryMyPositions(owner, project)
    )
  );
};
