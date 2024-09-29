/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import "../../../../config/envConfig";
import { describe, test, expect } from "vitest";
import { checkDatabaseConnection } from "./connection";

describe("Database Connection Test", () => {
  test("should have a connection to the test database", async () => {
    const isConnected = await checkDatabaseConnection();
    expect(isConnected).toBeTruthy();
  });
});
