/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/consistent-type-imports */

"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { api } from "~/trpc/react";

interface Item {
  id: number;
  polish: string;
  english: string;
}

export interface DataType {
  cause: Item[];
  change: Item[];
  character: Item[];
  feature: Item[];
}

interface ItemForDatabase {
  category: string;
  polish: string;
  english: string;
}

interface DataContextType {
  data: Record<string, Item[]> | undefined;
  isLoading: boolean;
  error: unknown;
  categories: Item[][];
  insertData: (newItem: ItemForDatabase) => void;
  deleteItem: (category: string, id: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Item[][]>([]);
  const { data, error, isLoading } = api.data.fetchData.useQuery({
    specifier: "all",
  });

  const utils = api.useUtils(); //access to React Query context for invalidation

  const insertMutation = api.data.insertData.useMutation({
    onSuccess: () => {
      utils.data.fetchData.invalidate();
    },
  });

  const insertData = (newItem: ItemForDatabase) => {
    insertMutation.mutate(newItem);
  };

  const deleteMutation = api.data.deleteItem.useMutation({
    onSuccess: () => {
      utils.data.fetchData.invalidate();
    },
  });

  // const deleteMutation = api.data.deleteItem.useMutation({
  //   onMutate: async ({ category, id }) => {
  //     await utils.data.fetchData.cancel()

  //     const previousData = utils.data.fetchData.getData();

  //     utils.data.fetchData.setData(undefined, (oldData) => {
  //       if (!oldData) return oldData;

  //       // Return a new state without the deleted item
  //       return {
  //         ...oldData,
  //         [category]: oldData[category].filter((item) => item.id !== id),
  //       };
  //     })
  //   }
  // });

  // const deleteMutation = api.data.deleteItem.useMutation({
  //   // This is where the optimistic update starts
  //   onMutate: async ({ category, id }) => {
  //     // Cancel any outgoing refetches (so they don't overwrite optimistic update)
  //     await utils.data.fetchData.cancel();

  //     // Snapshot the previous data for rollback if needed
  //     const previousData = utils.data.fetchData.getData();

  //     // Optimistically update the UI by filtering out the deleted item
  //     utils.data.fetchData.setData({ specifier: "all" }, (oldData) => {
  //       if (!oldData || !oldData[category]) {
  //         return oldData; // Return the existing data if oldData or the category doesn't exist
  //       }

  //       // Return a new state without the deleted item
  //       return {
  //         ...oldData,
  //         [category]: oldData[category].filter((item) => item.id !== id),
  //       };
  //     });

  //     // Return a context with the previousData to use in onError
  //     return { previousData };
  //   },
  //   // In case of an error, rollback the optimistic update
  //   onError: (err, variables, context) => {
  //     if (context?.previousData) {
  //       // Revert to the previous state
  //       utils.data.fetchData.setData(
  //         { specifier: "all" },
  //         context.previousData
  //       );
  //     }
  //   },
  //   // After mutation success or failure, refetch the data
  //   onSettled: () => {
  //     utils.data.fetchData.invalidate();
  //   },
  // });

  const deleteItem = (category: string, id: number) => {
    deleteMutation.mutate({ category, id });
  };

  useEffect(() => {
    if (data) {
      const newCategories: Item[][] = [];

      if (data.feature) {
        newCategories.push(data.feature);
      }

      if (data.change) {
        newCategories.push(data.change);
      }

      if (data.cause) {
        newCategories.push(data.cause);
      }

      if (data.character) {
        newCategories.push(data.character);
      }

      setCategories(newCategories);
    }
  }, [data]);

  return (
    <DataContext.Provider
      value={{ data, isLoading, error, categories, insertData, deleteItem }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
