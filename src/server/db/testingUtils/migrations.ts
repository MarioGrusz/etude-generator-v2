/* eslint-disable @typescript-eslint/consistent-type-imports */

import { type Client } from "~/server/db/interfaces";

export const runMigrations = async (client: Client): Promise<void> => {
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS feature (
            id SERIAL PRIMARY KEY,
            polish TEXT UNIQUE NOT NULL,
            english TEXT UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS change (
            id SERIAL PRIMARY KEY,
            polish TEXT UNIQUE NOT NULL,
            english TEXT UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS cause (
            id SERIAL PRIMARY KEY,
            polish TEXT UNIQUE NOT NULL,
            english TEXT UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS character (
            id SERIAL PRIMARY KEY,
            polish TEXT UNIQUE NOT NULL,
            english TEXT UNIQUE NOT NULL
        ); 
    `);
    console.log("Migrations run successfully.");
  } catch (error) {
    console.error("Error running migrations:", error);
  }
};
