/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryResultRow } from "pg";
import { pool } from "./connection";

interface Client {
  query: (queryText: string, values?: unknown[]) => Promise<unknown>;
  release(): unknown;
}

interface Item {
  categoryName: string;
  polishWord: string;
  englishWord: string;
}

interface QueryResult {
  rows: QueryResultRow[];
}

export const insertIntoDatabase = async (word: Item, client?: Client) => {
  const validCategories = ["feature", "change", "cause", "character"];
  if (!validCategories.includes(word.categoryName)) {
    console.error("Invalid category name:", word.categoryName);
    return false;
  }

  const localClient = client ?? (await pool.connect());

  try {
    await localClient.query("BEGIN");

    const query = `
        INSERT INTO ${word.categoryName} (polish, english)
        VALUES ($1, $2)
        ON CONFLICT (polish)
        DO UPDATE SET polish = EXCLUDED.polish, english = EXCLUDED.english
        RETURNING id;
      `;

    const wordResult = (await localClient.query(query, [
      word.polishWord,
      word.englishWord,
    ])) as QueryResult;

    await localClient.query("COMMIT");

    return wordResult.rows.length > 0 ? wordResult.rows[0] : null;
  } catch (e) {
    await localClient.query("ROLLBACK");
    console.error("Error inserting word:", e);
    return false;
  } finally {
    try {
      await localClient.release();
    } catch (releaseError) {
      console.error("Error releasing client:", releaseError);
    }
  }
};
