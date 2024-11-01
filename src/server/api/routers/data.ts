import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getDataByCategory } from "~/server/db/getCategories/getCategories";
import { insertItem } from "~/server/db/insertItem/insertItem";
import { deleteItem } from "~/server/db/deleteItem/deleteItem";
import { getFourRandomItems } from "~/server/db/getRandomItems/getRandomItems";

export const dataRouter = createTRPCRouter({
  getRandomItems: publicProcedure
    .input(
      z.object({
        feature: z.number().nullable(),
        change: z.number().nullable(),
        cause: z.number().nullable(),
        character: z.number().nullable(),
      })
    )
    .query(async ({ input }) => {
      const randomWords = await getFourRandomItems(input);
      if (!randomWords) {
        throw new Error("Random words not found or invalid input");
      }
      return randomWords;
    }),

  getCategoryData: publicProcedure
    .input(
      z.object({ specifier: z.string().min(1, "Category cannot be empty") })
    )
    .query(async ({ input }) => {
      const data = await getDataByCategory(input.specifier);
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
      const wordSet = await insertItem(input);
      if (!wordSet) {
        throw new Error("Error during inserting data");
      }
      return wordSet;
    }),

  deleteData: publicProcedure
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
