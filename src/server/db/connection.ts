/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.POSTGRES_CONNECTION_STRING,
});

export async function checkDatabaseConnection() {
  try {
    await pool.query("SELECT NOW()");
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
}
