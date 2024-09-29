/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "../../../../config/envConfig";
import { getRandomItems } from "./getRandomItems";
import { describe, test, expect } from "vitest";

const options = {
  feature_id: null,
  change_id: null,
  cause_id: null,
  character_id: null,
};

describe("Query generator test", () => {
  test("should generate query", async () => {
    const result = await getRandomItems(options);
    expect(result).toMatchObject({
      result: {
        feature: expect.any(Object),
        change: expect.any(Object),
        cause: expect.any(Object),
        character: expect.any(Object),
      },
    });
  });
});
