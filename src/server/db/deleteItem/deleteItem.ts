/* eslint-disable @typescript-eslint/consistent-type-imports */

import { QueryResultRow } from "pg";
import { pool } from "../config/connection";
import { type Client } from "~/server/db/interfaces";

interface QueryResult {
  rows: QueryResultRow[];
}

export const deleteItem = async (
  category: string,
  id: number,
  client?: Client
) => {
  const validCategories = ["cause", "change", "character", "feature"];

  if (!validCategories.includes(category)) {
    throw new Error(`Invalid category: ${category}`);
  }

  const localClient = client ?? (await pool.connect());
  try {
    await localClient.query("BEGIN");

    const query = `DELETE FROM ${category} WHERE id = $1 RETURNING *;`;
    const result = await localClient.query(query, [id]);

    await localClient.query("COMMIT");

    return (result as QueryResult).rows[0];
  } catch (error) {
    await localClient.query("ROLLBACK");
    console.error("Error deleting item:", error);
    return null;
  } finally {
    if (!client && localClient && typeof localClient.release === "function") {
      localClient.release();
    }
  }
};
