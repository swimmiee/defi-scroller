import { ProjectInfoWithInvests } from "interfaces/invest-project-info.interface";

export const getInvestmentIdsString = (
  project: ProjectInfoWithInvests
): string => {
  return (
    "[" +
    project.invests
      .map((i) => i.idAtSubgraph)
      .filter((id) => id)
      .map((id) => `"${id}"`)
      .join(",") +
    "]"
  );
};

export const time2string = (dateFrom: Date, dateTo: Date): [number, number] => {
  const timeFrom = Math.floor(dateFrom.getTime() / 1000);
  const timeTo = Math.floor(dateTo.getTime() / 1000);
  return [timeFrom, timeTo];
};
