/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { pool } from "../config/connection";

interface Client {
  query: (queryText: string, values?: unknown[]) => Promise<unknown>;
  release(): unknown;
}

interface Ids {
  feature_id: number | null;
  change_id: number | null;
  cause_id: number | null;
  character_id: number | null;
}

interface BaseItem {
  id: number;
  polish: string;
  english: string;
}

interface QueryResult {
  result: {
    feature: BaseItem;
    change: BaseItem;
    cause: BaseItem;
    character: BaseItem;
  };
}

export function generateDynamicQuery(ids: Ids): {
  query: string;
  params: number[];
} {
  const params: number[] = [];
  const subqueries: string[] = [];
  const selectedColumns: string[] = [];
  const jsonObjectParts: string[] = [];

  const categoryMap: Record<keyof Ids, string> = {
    feature_id: "feature",
    change_id: "change",
    cause_id: "cause",
    character_id: "character",
  };

  const entries = Object.entries(ids);

  entries.forEach(([key, value], index) => {
    const categoryName = categoryMap[key as keyof Ids];

    if (value !== null && value !== undefined) {
      subqueries.push(`
        ${categoryName} AS (
            SELECT id, polish, english 
            FROM ${categoryName} 
            WHERE id = $${params.length + 1} 
            LIMIT 1
        )`);
      params.push(Number(value));
    } else {
      subqueries.push(` 
        ${categoryName} AS (
            SELECT id, polish, english 
            FROM ${categoryName} 
            ORDER BY RANDOM() 
            LIMIT 1
        )`);
    }

    const isLast = index === entries.length - 1;

    jsonObjectParts.push(`
      '${categoryName}', JSON_BUILD_OBJECT(
          'id', ${categoryName}.id,
          'polish', ${categoryName}.polish,
          'english', ${categoryName}.english
      )`);

    const select = `
      ${categoryName}.id AS ${categoryName}_id,
      ${categoryName}.polish AS ${categoryName}_polish,
      ${categoryName}.english AS ${categoryName}_english${isLast ? "" : ","}
    `;

    selectedColumns.push(select);
  });

  const cleanedSubqueries = subqueries.join(",\n");
  const jsonObject = jsonObjectParts.join(",\n");

  const query = `
    WITH ${cleanedSubqueries}
    SELECT 
    JSON_BUILD_OBJECT(${jsonObject}
    ) AS result
    FROM feature
    LEFT JOIN change ON true
    LEFT JOIN cause ON true
    LEFT JOIN character ON true;
  `;
  //console.log(query, params);
  return { query, params };
}

export async function getRandomItems(
  options: Ids
): Promise<QueryResult | undefined> {
  const { query, params } = generateDynamicQuery(options);
  const { rows } = await pool.query<QueryResult>(query, params);
  if (!rows || rows.length === 0) return undefined;
  const structuredResult = rows[0];
  console.log("Fetched Row:", structuredResult);
  return structuredResult!;
}
