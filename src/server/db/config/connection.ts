/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.POSTGRES_CONNECTION_STRING,
});

pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("Error in PostgreSQL client pool", err);
  process.exit(-1);
});

export const checkDatabaseConnection = async (): Promise<boolean> => {
  const client = await pool.connect();

  try {
    await client.query("SELECT NOW()");
    console.log("Successfully connected to the database");
    return true;
  } catch (err) {
    console.error("Failed to connect to the database", err);
    return false;
  } finally {
    client.release();
  }
};
