/* eslint-disable @typescript-eslint/no-unsafe-return */
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
  id?: number;
  category: string;
  polish: string;
  english: string;
}

/* 

  TODO LATER: 
  1. general function to updateData,
  2. general function to mutate data
  DRY

*/

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

  const utils = api.useUtils();

  const insertMutation = api.data.insertData.useMutation({
    onMutate: async ({ category, polish, english }) => {
      await utils.data.fetchData.cancel();

      const previousData = utils.data.fetchData.getData();
      const tempId = Date.now();

      utils.data.fetchData.setData({ specifier: "all" }, (oldData) => {
        if (!oldData) return oldData;

        const updatedData = {
          ...oldData,
          [category]: [
            ...(oldData[category] ?? []),
            { id: tempId, polish, english },
          ],
        };

        console.log("Updated Data after optimistic update:", updatedData);

        return updatedData;
      });

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        utils.data.fetchData.setData(
          { specifier: "all" },
          context.previousData
        );
      }
    },
    onSettled: () => {
      utils.data.fetchData.invalidate();
    },
  });

  const insertData = (newItem: ItemForDatabase) => {
    insertMutation.mutate(newItem);
  };

  const deleteMutation = api.data.deleteItem.useMutation({
    onMutate: async ({ category, id }) => {
      await utils.data.fetchData.cancel();

      const previousData = utils.data.fetchData.getData();

      utils.data.fetchData.setData({ specifier: "all" }, (oldData) => {
        if (!oldData) return oldData;

        const updatedData = {
          ...oldData,
          [category]: oldData[category]
            ? oldData[category]?.filter((item) => item.id !== id)
            : [],
        };

        console.log("Updated Data after optimistic update:", updatedData);

        return updatedData;
      });

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        utils.data.fetchData.setData(
          { specifier: "all" },
          context.previousData
        );
      }
    },
    onSettled: () => {
      utils.data.fetchData.invalidate();
    },
  });

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
