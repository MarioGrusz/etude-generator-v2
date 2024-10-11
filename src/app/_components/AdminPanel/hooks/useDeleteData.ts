import { api } from "~/trpc/react";

export const useDeleteData = () => {
  const utils = api.useUtils();

  const deleteMutation = api.data.deleteData.useMutation({
    onMutate: async (variables: { category: string; id: number }) => {
      await utils.data.getCategoryData.cancel();
      const previousData = utils.data.getCategoryData.getData();

      utils.data.getCategoryData.setData(
        { specifier: variables.category },
        (oldData) => {
          if (!oldData) return oldData;

          const updatedData = oldData.filter(
            (item) => item.id !== variables.id
          );

          console.log("Updated Data after optimistic update:", updatedData);
          return updatedData;
        }
      );

      return { previousData };
    },
    onError: (err, variables, context) => {
      const { category } = variables;
      if (context?.previousData) {
        utils.data.getCategoryData.setData(
          { specifier: category },
          context.previousData
        );
      }
    },
    onSettled: async () => {
      await utils.data.getCategoryData.invalidate();
    },
  });

  return deleteMutation;
};
