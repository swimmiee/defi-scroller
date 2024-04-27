import { ProjectInfoWithInvests } from "interfaces/invest-project-info.interface";
import { AllPositionQueryResult } from "interfaces/allpositions.query.interface";
import { queryAll } from "./querySubgraph";
import { getInvestmentIdsString, time2string } from "./subgraph.utils";

const _queryAllPositions = async (
  project: ProjectInfoWithInvests,
  dateFrom: Date,
  dateTo: Date
): Promise<AllPositionQueryResult[]> => {
  const subgraphInvestmentIds = getInvestmentIdsString(project);
  const [timeFrom, timeTo] = time2string(dateFrom, dateTo);

  return queryAll<AllPositionQueryResult>(
    project.subgraphUrl,
    (idCursor: string) => {
      const cursor = idCursor ? `id_gt: "${idCursor}"` : "";
      return `query {
        positions (
          first: 1000
          orderBy: id 
          orderDirection: asc
          where: {
            closed: false
            investment_in: ${subgraphInvestmentIds}
            ${cursor} 
          }
        ){
          id
          owner
          amounts
          investment { id }
          changes(
            where:{
              action_not: Harvest
              blockTimestamp_gte: ${timeFrom}
              blockTimestamp_lte: ${timeTo}
            }
            first: 1
            orderBy: blockTimestamp
            orderDirection: asc
          ){
            id
          }

          harvests: changes(
            where:{
              action: Harvest
              blockTimestamp_gte: ${timeFrom}
              blockTimestamp_lte: ${timeTo}
            }
            orderBy: blockTimestamp
            orderDirection: desc
          ){
            blockTimestamp
            dAmounts
          }

          snapshots(
            where:{
              blockTimestamp_gte: ${timeFrom}
              blockTimestamp_lte: ${timeTo}
            }
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
    `${project.name}_${project.chainId}_Positions`
  );
};

export const queryAllPositions = async (
  projects: ProjectInfoWithInvests[],
  dateFrom: Date,
  dateTo: Date
): Promise<AllPositionQueryResult[][]> => {
  return Promise.all(
    projects.map((project) => _queryAllPositions(project, dateFrom, dateTo))
  );
};
