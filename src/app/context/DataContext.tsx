"use client";

/* eslint-disable @typescript-eslint/consistent-type-imports */
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

// interface SharedData {
//   data: Item[];
//   setData: (data: string) => void;
// }

export interface DataType {
  cause: Item[];
  change: Item[];
  character: Item[];
  feature: Item[];
}

interface DataContextType {
  data: Record<string, Item[]> | undefined;
  isLoading: boolean;
  error: unknown;
  categories: Item[][];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Item[][]>([]);
  const { data, error, isLoading } = api.data.fetchData.useQuery({
    specifier: "all",
  });

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
    <DataContext.Provider value={{ data, isLoading, error, categories }}>
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
