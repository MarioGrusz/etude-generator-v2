/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { pool } from "./config/connection";
import { type User } from "./interfaces";

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const query = `SELECT id, email, name FROM users WHERE email = $1`;
    const params = [email];
    const { rows } = await pool.query(query, params);

    if (!rows || rows.length === 0) return undefined;
    const user = rows[0];
    return user as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
