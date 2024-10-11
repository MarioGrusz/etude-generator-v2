/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { pool } from "./config/connection";
import { type Client, type QueryResult, type Item } from "./interfaces";

export const getDataByCategory = async (
  category: string,
  client?: Client
): Promise<Item[] | null> => {
  if (category === "") return null;
  const categories = ["cause", "change", "character", "feature"];
  if (!categories.includes(category)) {
    throw new Error(`Invalid category: ${category}`);
  }

  const localClient = client ?? (await pool.connect());

  try {
    await localClient.query("BEGIN");

    const query = `SELECT id, polish, english FROM ${category};`;
    const res = await localClient.query(query);

    await localClient.query("COMMIT");

    return (res as QueryResult).rows.map((row) => ({
      id: row.id,
      polish: row.polish,
      english: row.english,
    })) as Item[];
  } catch (error) {
    await localClient.query("ROLLBACK");
    console.error("Error fetching data:", error);
    return null;
  } finally {
    if (!client) {
      localClient.release();
    }
  }
};
