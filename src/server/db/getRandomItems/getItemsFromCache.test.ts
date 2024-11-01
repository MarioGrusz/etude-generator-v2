/* eslint-disable @typescript-eslint/consistent-type-imports */
import { describe, expect, beforeEach, it } from "vitest";
import { getItemsFromCache } from "./getRandomItems";
import { cacheState, cachedValues } from "./getRandomItems";

describe("getItemsFromCache", () => {
  beforeEach(() => {
    Object.assign(cachedValues, {
      cause: [{ id: 1, polish: "przykład", english: "example" }],
    });
    Object.assign(cacheState, {
      nextUpdate: new Date(2000, 1, 1),
      progress: null,
    });
  });

  it("should return cached values if nextUpdate is in the future", async () => {
    cacheState.nextUpdate = new Date(Date.now() + 24 * 60 * 60 * 1000); // Future date
    const result = await getItemsFromCache();
    expect(result).toBe(cachedValues); // Check if it returns cached values
  });

  it("should update cache if nextUpdate is in the past", async () => {
    const result = await getItemsFromCache();
    expect(cacheState.nextUpdate.getTime()).toBeGreaterThan(Date.now()); // Ensure nextUpdate is now in the future
    expect(result).toBe(cachedValues); // Verify updated cache
  });

  it("should return progress if cache update is in progress", async () => {
    // Simulate progress already in place
    cacheState.progress = new Promise((resolve) => resolve(cachedValues));
    const result = await getItemsFromCache();
    expect(result).toBe(cachedValues); // It should await progress and return cached values
  });
});
