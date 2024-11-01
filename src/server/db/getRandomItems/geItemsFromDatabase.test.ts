/* eslint-disable @typescript-eslint/consistent-type-imports */
import "../../../../config/envConfig";
import { describe, expect, beforeEach, afterEach, it } from "vitest";
import { Client } from "pg";
import {
  createTestDatabase,
  teardownTestDatabase,
} from "../testingUtils/helper";
import { runMigrations } from "../testingUtils/migrations";
import { getItemsFromDatabase } from "./getRandomItems";
import { insertItem } from "../insertItem/insertItem";
import { mockDataToInsert } from "../testingUtils/dataForTests";

const resultFromDatabase = {
  feature: [
    { id: 1, polish: "ciekawość", english: "curiosity" },
    { id: 2, polish: "zainteresowanie", english: "interest" },
    { id: 3, polish: "zdziwienie", english: "astonishment" },
    { id: 4, polish: "zaskoczenie", english: "surprise" },
    { id: 5, polish: "znudzenie", english: "boredom" },
  ],

  change: [
    { id: 1, polish: "refleksja", english: "reflection" },
    { id: 2, polish: "decyzja", english: "decision" },
    { id: 3, polish: "nagła reakcja", english: "sudden reaction" },
    { id: 4, polish: "kontynuacja", english: "continuation" },
    { id: 5, polish: "na raty", english: "in installments" },
  ],

  cause: [
    { id: 1, polish: "defekt", english: "defect" },
    { id: 2, polish: "zapach", english: "smell" },
    { id: 3, polish: "odgłos (odgłosy)", english: "sound (sounds)" },
    { id: 4, polish: "obserwacja (widok)", english: "observation (sight)" },
    { id: 5, polish: "temperatura", english: "temperature" },
  ],

  character: [
    { id: 1, polish: "szybko", english: "quickly" },
    { id: 2, polish: "wolno", english: "slowly" },
    { id: 3, polish: "naturalnie", english: "naturally" },
    { id: 4, polish: "skrupulatność", english: "meticulously" },
    { id: 5, polish: "powierzchownie", english: "superficially" },
  ],
};

const categories = ["cause", "change", "character", "feature"];

describe("testing getItemsFromDatabase function", () => {
  let client: Client;

  beforeEach(async () => {
    client = await createTestDatabase();
    await runMigrations(client);
    await Promise.all(mockDataToInsert.map((item) => insertItem(item, client)));
  });

  afterEach(async () => {
    await teardownTestDatabase(client);
  });

  it("should return items from all categories", async () => {
    const result = await getItemsFromDatabase(client);

    expect(result).toEqual(resultFromDatabase);
  });

  it("should return empty arrays if there are no items in the categories", async () => {
    await Promise.all(
      categories.map((category) => client.query(`DELETE FROM ${category}`))
    );

    const result = await getItemsFromDatabase(client);
    expect(result).toEqual({
      cause: [],
      change: [],
      character: [],
      feature: [],
    });
  });
});
