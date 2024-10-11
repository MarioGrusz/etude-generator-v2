import { api } from "~/trpc/react";
import { type ItemToInsert } from "../interfaces";

export const useInsertData = () => {
  const utils = api.useUtils();

  const insertMutation = api.data.insertData.useMutation({
    onMutate: async (itemToInsert: ItemToInsert) => {
      await utils.data.getCategoryData.cancel();

      const previousData = utils.data.getCategoryData.getData();
      const tempId = Date.now();

      utils.data.getCategoryData.setData(
        { specifier: itemToInsert.category },
        (oldData) => {
          if (!oldData) return oldData;

          const updateCategoryData = [
            ...oldData,
            {
              id: tempId,
              polish: itemToInsert.polish,
              english: itemToInsert.english,
            },
          ];
          console.log(
            "Updated Data after optimistic update:",
            updateCategoryData
          );

          return updateCategoryData;
        }
      );

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        utils.data.getCategoryData.setData(
          { specifier: variables.category },
          context.previousData
        );
      }
    },
    onSettled: async () => {
      await utils.data.getCategoryData.invalidate();
    },
  });

  return insertMutation;
};
