import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fetchDataBySpecifier } from "~/server/db/retrieve";
import { insertIntoDatabase } from "~/server/db/insert";
import { deleteItem } from "~/server/db/delete";
import { getRandomItems } from "~/server/db/getRandomItems/getRandomItems";

export const dataRouter = createTRPCRouter({
  getRandomItems: publicProcedure
    .input(
      z.object({
        feature_id: z.number().nullable(),
        change_id: z.number().nullable(),
        cause_id: z.number().nullable(),
        character_id: z.number().nullable(),
      })
    )
    .query(async ({ input }) => {
      const randomWords = await getRandomItems(input);
      if (!randomWords) {
        throw new Error("Random words not found or invalid input");
      }
      return randomWords;
    }),

  fetchData: publicProcedure
    .input(z.object({ specifier: z.string() }))
    .query(async ({ input }) => {
      const data = await fetchDataBySpecifier(input.specifier);
      if (!data) {
        throw new Error("Data not found or invalid specifier");
      }
      return data;
    }),

  insertData: publicProcedure
    .input(
      z.object({
        category: z.string(),
        polish: z.string(),
        english: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const wordSet = await insertIntoDatabase(input);
      if (!wordSet) {
        throw new Error("Error during inserting data");
      }
      return wordSet;
    }),

  deleteItem: publicProcedure
    .input(
      z.object({
        category: z.string(),
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const deletedItem = await deleteItem(input.category, input.id);
      if (!deleteItem) {
        throw new Error("Error during inserting data");
      }
      return deletedItem;
    }),
});
