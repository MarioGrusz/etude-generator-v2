/* eslint-disable @typescript-eslint/consistent-type-imports */
import { describe, expect, beforeEach, afterEach, it } from "vitest";
import { Client } from "pg";
import "../../../../config/envConfig";

import {
  createTestDatabase,
  teardownTestDatabase,
} from "../testingUtils/helper";
import { runMigrations } from "../testingUtils/migrations";
import { insertItem } from "./insertItem";
import { mockDataToInsert } from "../testingUtils/dataForTests";

const result = [
  { id: 1, polish: "ciekawość", english: "curiosity" },
  { id: 2, polish: "zainteresowanie", english: "interest" },
  { id: 3, polish: "zdziwienie", english: "astonishment" },
  { id: 4, polish: "zaskoczenie", english: "surprise" },
  { id: 5, polish: "znudzenie", english: "boredom" },
  { id: 1, polish: "refleksja", english: "reflection" },
  { id: 2, polish: "decyzja", english: "decision" },
  { id: 3, polish: "nagła reakcja", english: "sudden reaction" },
  { id: 4, polish: "kontynuacja", english: "continuation" },
  { id: 5, polish: "na raty", english: "in installments" },
  { id: 1, polish: "defekt", english: "defect" },
  { id: 2, polish: "zapach", english: "smell" },
  { id: 3, polish: "odgłos (odgłosy)", english: "sound (sounds)" },
  { id: 4, polish: "obserwacja (widok)", english: "observation (sight)" },
  { id: 5, polish: "temperatura", english: "temperature" },
  { id: 1, polish: "szybko", english: "quickly" },
  { id: 2, polish: "wolno", english: "slowly" },
  { id: 3, polish: "naturalnie", english: "naturally" },
  { id: 4, polish: "skrupulatność", english: "meticulously" },
  { id: 5, polish: "powierzchownie", english: "superficially" },
];

describe("testing inserting items into database", () => {
  let client: Client;

  beforeEach(async () => {
    client = await createTestDatabase();
    await runMigrations(client);
  });

  afterEach(async () => {
    await teardownTestDatabase(client);
  });

  it("should insert data to database", async () => {
    expect(
      await Promise.all(
        mockDataToInsert.map((item) => insertItem(item, client))
      )
    ).toStrictEqual(result);
  });
});
