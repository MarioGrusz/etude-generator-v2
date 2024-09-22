import { Client } from "pg";
import { env } from "../../../env";

const config = {
  host: env.PG_TEST_HOST,
  port: Number(env.PG_PORT),
  user: env.PG_TEST_USER,
  password: env.PG_PASSWORD,
  database: env.PG_TEST_DATABASE,
};

console.log("CONFIG", config);

// console.log({
//   PG_TEST_USER: process.env.PG_TEST_USER,
//   PG_TEST_HOST: process.env.PG_TEST_HOST,
//   PG_PASSWORD: process.env.PG_PASSWORD,
//   PG_TEST_DATABASE: process.env.PG_TEST_DATABASE,
//   PG_PORT: process.env.PG_PORT,
// });

const runWithDefaultDatabaseConnection = async (
  fn: (client: Client) => Promise<void>
): Promise<void> => {
  const client = new Client(config);
  await client.connect();
  await fn(client);
  await client.end();
};

/**
 * Creates a new database using template0 and
 * returns a `Client` connected to the newly created database.
 *
 * @returns `Client`
 */
export const createTestDatabase = async (): Promise<Client> => {
  if (process.env.VITEST === undefined) {
    throw new Error("Function was not executed with Vitest.");
  }

  const database = `vitest-db-${crypto.randomUUID()}`;
  await runWithDefaultDatabaseConnection(async (client) => {
    await client.query(`CREATE DATABASE "${database}" TEMPLATE template0;`);
  });
  const client = new Client({ ...config, database });
  await client.connect();
  return client;
};

/**
 * Closes the connection and drops the database.
 */

export const teardownTestDatabase = async (client: Client): Promise<void> => {
  if (process.env.VITEST === undefined) {
    throw new Error("Function was not executed with Vitest.");
  }

  const database = await client
    .query<{ current_database: string }>("SELECT current_database();")
    .then(({ rows }) => rows[0]?.current_database);

  await client.end();

  await runWithDefaultDatabaseConnection(async (client) => {
    await client.query(`DROP DATABASE "${database}";`);
  });
};
