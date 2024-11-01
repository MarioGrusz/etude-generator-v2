/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { pool } from "../config/connection";
import {
  type Client,
  type QueryResult,
  type ItemsIds,
  type Result,
  type Item,
} from "../interfaces";

const categories = ["cause", "change", "character", "feature"];

export async function getItemsFromDatabase(client?: Client) {
  const localClient = client ?? (await pool.connect());
  const result: Record<string, Item[]> = {};

  for (const category of categories) {
    try {
      const res = await localClient.query(
        `SELECT id, polish, english FROM ${category}`
      );
      result[category] = (res as QueryResult).rows.map((row) => ({
        id: row.id,
        polish: row.polish,
        english: row.english,
      })) as Item[];
    } catch (error) {
      console.error(`Error fetching items from ${category}:`, error);
    }
  }

  return result;
}

export let cachedValues: Record<string, Item[]> = {};
export const cacheState: {
  nextUpdate: Date;
  progress: Promise<Record<string, Item[]> | null> | null;
} = {
  nextUpdate: new Date(2000, 1, 1),
  progress: null,
};

export async function getItemsFromCache() {
  if (cacheState.nextUpdate < new Date()) {
    {
      if (cacheState.progress) {
        console.log("Cache update in progress...");
        return await cacheState.progress;
      }
      cacheState.progress = new Promise((resolve) => {
        // load and return cache
        cacheState.nextUpdate = new Date(Date.now() + 24 * 60 * 60 * 1000); //every 24h
        // update cachedValues
        resolve(cachedValues);
      });
    }
  }
  return cachedValues;
}

async function getItems(
  client?: Client
): Promise<Record<string, Item[]> | null> {
  const cachedResults = await getItemsFromCache();

  if (cachedResults && Object.keys(cachedResults).length !== 0) {
    console.log("Returning cached data.");
    return cachedResults;
  }
  const result = await getItemsFromDatabase(client);
  console.log("data from sql");

  if (result) {
    console.log("Fetched new data:");
    cachedValues = result;
  } else {
    console.warn("No data fetched from the database.");
  }

  return result;
}

const ids: ItemsIds = {
  feature: null,
  change: 2,
  cause: null,
  character: null,
};

export async function getFourRandomItems(items_ids: ItemsIds): Promise<Result> {
  try {
    const categories = await getItems();
    const result: Result = {
      feature: null,
      change: null,
      cause: null,
      character: null,
    };

    if (categories) {
      Object.entries(categories).forEach(([key, categoryItems]) => {
        const correspondingId = items_ids[key as keyof ItemsIds];

        if (correspondingId === null) {
          const randomIndex = Math.floor(Math.random() * categoryItems.length);
          const randomItem = categoryItems[randomIndex];
          console.log(`Random ${key}:`, randomItem);
          if (randomItem) result[key as keyof Result] = randomItem;
        } else {
          const itemWithId = categoryItems.find(
            (item) => item.id === correspondingId
          );
          if (itemWithId) {
            console.log(`Specific ${key}:`, itemWithId);
            if (itemWithId) result[key as keyof Result] = itemWithId;
          } else {
            console.log(`No item found in ${key} with ID:`, correspondingId);
          }
        }
      });
    }

    return result;
  } catch (error) {
    console.error("Error retrieving items:", error);
    throw new Error("Failed to retrieve items. Please try again later.");
  }
}
