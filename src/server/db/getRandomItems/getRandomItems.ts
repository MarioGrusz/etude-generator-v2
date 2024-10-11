/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { pool } from "../config/connection";
import {
  type Client,
  type QueryResult,
  type Ids,
  type Result,
} from "../interfaces";

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
  return { query, params };
}

export async function getRandomItems(
  options: Ids,
  client?: Client
): Promise<Result[] | null> {
  const localClient = client ?? (await pool.connect());

  try {
    await localClient.query("BEGIN");
    const { query, params } = generateDynamicQuery(options);
    const res = await localClient.query(query, params);
    await localClient.query("COMMIT");

    return (res as QueryResult).rows.map((row) => ({
      result: row.result,
    })) as Result[];
  } catch (error) {
    await localClient.query("ROLLBACK");
    console.error("Error fetching data:", error);
    return null;
  }
}
