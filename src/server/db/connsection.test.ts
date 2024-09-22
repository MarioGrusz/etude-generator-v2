/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { Client } from "pg";
import { checkDatabaseConnection } from "./connection";

describe("connection test", () => {
  let client: Client;

  test("should have a connection to test database", async () => {
    const connect = await checkDatabaseConnection();
  });
});
