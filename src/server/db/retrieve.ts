/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { QueryResultRow } from "pg";
import { pool } from "./connection";

interface Client {
  query: (queryText: string, values?: unknown[]) => Promise<unknown>;
  release(): unknown;
}

interface QueryResult {
  rows: QueryResultRow[];
}

interface Item {
  id: number;
  polish: string;
  english: string;
}

export const fetchDataBySpecifier = async (
  specifier: string,
  client?: Client
) => {
  const categories = ["cause", "change", "character", "feature"];
  const queries: Promise<unknown>[] = [];
  const results: Record<string, Item[]> = {};

  const localClient = client ?? (await pool.connect());

  try {
    await localClient.query("BEGIN");

    if (specifier === "all") {
      categories.forEach((category) => {
        const query = `SELECT id, polish, english FROM ${category};`;
        queries.push(
          localClient.query(query).then((res) => {
            results[category] = (res as QueryResult).rows.map((row) => ({
              id: row.id,
              polish: row.polish,
              english: row.english,
            })) as Item[];
          })
        );
      });
    } else if (categories.includes(specifier)) {
      const query = `SELECT id, polish, english FROM ${specifier};`;
      queries.push(
        localClient.query(query).then((res) => {
          results[specifier] = (res as QueryResult).rows.map((row) => ({
            id: row.id,
            polish: row.polish,
            english: row.english,
          })) as Item[];
        })
      );
    } else {
      throw new Error(`Invalid specifier: ${specifier}`);
    }

    await Promise.all(queries);
    await localClient.query("COMMIT");

    return results;
  } catch (error) {
    await localClient.query("ROLLBACK");
    console.error("Error fetching data:", error);
    return null;
  }
};
