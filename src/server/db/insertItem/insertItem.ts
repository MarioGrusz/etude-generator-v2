/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { pool } from "../config/connection";
import { type Client } from "~/server/db/interfaces";
import { type QueryResult, type ItemToInsert } from "../interfaces";

export const insertItem = async (word: ItemToInsert, client?: Client) => {
  const validCategories = ["feature", "change", "cause", "character"];
  if (!validCategories.includes(word.category)) {
    console.error("Invalid category name:", word.category);
    return false;
  }

  const localClient = client ?? (await pool.connect());

  try {
    await localClient.query("BEGIN");

    const query = `
        INSERT INTO ${word.category} (polish, english)
        VALUES ($1, $2)
        ON CONFLICT (polish)
        DO UPDATE SET polish = EXCLUDED.polish, english = EXCLUDED.english
        RETURNING id, polish, english;
      `;

    const wordResult = (await localClient.query(query, [
      word.polish,
      word.english,
    ])) as QueryResult;

    await localClient.query("COMMIT");

    return wordResult.rows.length > 0 ? wordResult.rows[0] : null;
  } catch (e) {
    await localClient.query("ROLLBACK");
    console.error("Error inserting word:", e);
    return false;
  } finally {
    if (!client && localClient && typeof localClient.release === "function") {
      localClient.release();
    }
  }
};
