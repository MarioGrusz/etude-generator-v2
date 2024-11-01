/* eslint-disable @typescript-eslint/consistent-type-imports */
import "../../../../config/envConfig";
import { describe, expect, beforeEach, afterEach, it } from "vitest";
import { Client } from "pg";
import {
  createTestDatabase,
  teardownTestDatabase,
} from "../testingUtils/helper";
import { runMigrations } from "../testingUtils/migrations";
import { deleteItem } from "./deleteItem";
import { insertItem } from "../insertItem/insertItem";
import { mockDataToInsert } from "../testingUtils/dataForTests";

describe("testing deleteItem function", () => {
  let client: Client;

  beforeEach(async () => {
    client = await createTestDatabase();
    await runMigrations(client);
    await Promise.all(mockDataToInsert.map((item) => insertItem(item, client)));
  });

  afterEach(async () => {
    await teardownTestDatabase(client);
  });

  it("should delete an item from a valid category", async () => {
    const deletedItem = await deleteItem("feature", 1, client);
    expect(deletedItem).toEqual({
      id: 1,
      polish: "ciekawość",
      english: "curiosity",
    });

    const result = await client.query("SELECT * FROM feature WHERE id = $1", [
      1,
    ]);
    expect(result.rows).toHaveLength(0);
  });

  it("should throw an error for an invalid category", async () => {
    await expect(deleteItem("invalid_category", 1, client)).rejects.toThrow(
      "Invalid category: invalid_category"
    );
  });
});
