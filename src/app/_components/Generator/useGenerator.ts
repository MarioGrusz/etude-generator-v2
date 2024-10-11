import { useState, useCallback } from "react";
import { api } from "~/trpc/react";
import {
  INITIAL_QUERY_PARAMS,
  INITIAL_LOCKED_ITEMS,
  Categories,
} from "./constants";
import { type ToggleAttributes, type QueryParams } from "./interfaces";

const useGenerator = () => {
  const [lockedItems, setLockedItems] =
    useState<Map<string, ToggleAttributes>>(INITIAL_LOCKED_ITEMS);
  const [queryParams, setQueryParams] =
    useState<QueryParams>(INITIAL_QUERY_PARAMS);

  const { data, isLoading, error, refetch } =
    api.data.getRandomItems.useQuery(queryParams);

  const toggleLock = useCallback((category: string, id: number | null) => {
    setLockedItems((prevLockedItems) => {
      const newLockedItems = new Map(prevLockedItems);
      const currentLockedState = newLockedItems.get(category);

      newLockedItems.set(category, {
        blocked: !currentLockedState?.blocked,
        id: currentLockedState?.blocked ? null : id,
      });

      return newLockedItems;
    });
  }, []);

  const handleGenerate = async () => {
    setQueryParams({
      feature_id: lockedItems.get(Categories.FEATURE)?.id ?? null,
      change_id: lockedItems.get(Categories.CHANGE)?.id ?? null,
      cause_id: lockedItems.get(Categories.CAUSE)?.id ?? null,
      character_id: lockedItems.get(Categories.CHARACTER)?.id ?? null,
    });

    await refetch();
  };

  return {
    lockedItems,
    toggleLock,
    handleGenerate,
    data,
    isLoading,
    error,
  };
};

export default useGenerator;
