import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fetchDataBySpecifier } from "~/server/db/retrieve";

export const dataRouter = createTRPCRouter({
  fetchData: publicProcedure
    .input(z.object({ specifier: z.string() }))
    .query(async ({ input }) => {
      const data = await fetchDataBySpecifier(input.specifier);
      if (!data) {
        throw new Error("Data not found or invalid specifier");
      }
      return data;
    }),
});
