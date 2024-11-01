/* eslint-disable @typescript-eslint/consistent-type-imports */
import "../../../../config/envConfig";
import { describe, expect, beforeEach, afterEach, it } from "vitest";
import { Client } from "pg";
import {
  createTestDatabase,
  teardownTestDatabase,
} from "../testingUtils/helper";
import { runMigrations } from "../testingUtils/migrations";
import { getDataByCategory } from "./getCategories";
import { insertItem } from "../insertItem/insertItem";
import { mockDataToInsert } from "../testingUtils/dataForTests";

describe("testing getDataByCategory function", () => {
  let client: Client;

  beforeEach(async () => {
    client = await createTestDatabase();
    await runMigrations(client);
    await Promise.all(mockDataToInsert.map((item) => insertItem(item, client)));
  });

  afterEach(async () => {
    await teardownTestDatabase(client);
  });

  it("should return data for a valid category", async () => {
    const result = await getDataByCategory("feature", client);
    expect(result).toHaveLength(5); // Expecting 2 items
    expect(result).toEqual([
      { id: 1, polish: "ciekawość", english: "curiosity" },
      { id: 2, polish: "zainteresowanie", english: "interest" },
      { id: 3, polish: "zdziwienie", english: "astonishment" },
      { id: 4, polish: "zaskoczenie", english: "surprise" },
      { id: 5, polish: "znudzenie", english: "boredom" },
    ]);
  });

  it("should throw an error for an invalid category", async () => {
    await expect(getDataByCategory("invalid_category", client)).rejects.toThrow(
      "Invalid category: invalid_category"
    );
  });

  it("should return null for an empty category", async () => {
    const result = await getDataByCategory("", client);
    expect(result).toBeNull();
  });

  it("should handle errors and return null", async () => {
    const originalQuery = client.query.bind(client);
    client.query = async () => {
      throw new Error("Forced error for testing");
    };

    const result = await getDataByCategory("cause", client);
    expect(result).toBeNull();

    client.query = originalQuery;
  });
});
