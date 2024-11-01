/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { pool } from "../config/connection";
import {
  type Client,
  type QueryResult,
  type Item,
} from "~/server/db/interfaces";

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
    const query = `SELECT id, polish, english FROM ${category};`;
    const res = await localClient.query(query);

    return (res as QueryResult).rows.map((row) => ({
      id: row.id,
      polish: row.polish,
      english: row.english,
    })) as Item[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  } finally {
    if (!client && localClient && typeof localClient.release === "function") {
      localClient.release();
    }
  }
};
