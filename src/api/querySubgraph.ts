import axios from "axios";

/**
 *
 * @param endpoint subgraph endpoint
 * @param query graphql query string
 * @param operationName optional, operation name
 * @returns
 */
export async function querySubgraph<T>(
  endpoint: string,
  query: string,
  operationName = "Q"
) {
  return axios
    .post<{ data: T; errors: any }>(endpoint, {
      operationName,
      query,
    })
    .then((res) => res.data);
}

/**
 *
 * @param queryBuilder
 * @param entityName entity name in graphql query
 * @param take query should include 'first' argument
 * @param resultFilter filter out redundant results -> if not needed, just return true
 * @param initCursor
 * @param operationName
 * @returns
 */
export async function queryAll<T extends { id: string }>(
  endpoint: string,
  queryBuilder: (idCursor: string) => string,
  entityName: string,
  take: number,
  resultFilter: (p: T) => boolean,
  operationName: string = "Q"
): Promise<T[]> {
  let cursor = "";
  let results: T[] = [];

  let i = 0;
  while (true) {
    const query = queryBuilder(cursor);
    try {
      const res = await querySubgraph<{ [key in typeof entityName]: T[] }>(
        endpoint,
        query,
        operationName
      );

      const data = res.data[entityName];
      const hasMore = data.length === take;

      // target date에 해당하는 snapshot이 있는 position만 필터링
      results = results.concat(data.filter(resultFilter));

      console.log(operationName, `${results.length} ${hasMore ? '' : 'END'}`);
      if (!hasMore) break;

      cursor = data[data.length - 1].id;
      i++;
    } catch (error: any) {

      console.warn(operationName, error.message);
      continue;
    }
  }

  return results;
}
