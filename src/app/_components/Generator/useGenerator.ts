import { useState } from "react";
import { api } from "~/trpc/react";

interface ToggleAttributes {
  blocked?: boolean;
  id: number | null;
}

const useGenerator = () => {
  const [lockedItems, setLockedItems] = useState<Map<string, ToggleAttributes>>(
    new Map([
      ["feature", { blocked: false, id: null }],
      ["change", { blocked: false, id: null }],
      ["cause", { blocked: false, id: null }],
      ["character", { blocked: false, id: null }],
    ])
  );

  const [queryParams, setQueryParams] = useState<{
    feature_id: number | null;
    change_id: number | null;
    cause_id: number | null;
    character_id: number | null;
  }>({
    feature_id: null,
    change_id: null,
    cause_id: null,
    character_id: null,
  });

  const { data, isLoading, error, refetch } = api.data.getRandomItems.useQuery(
    queryParams,
    {
      enabled: true,
    }
  );

  const toggleLock = (category: string, id: number | null) => {
    setLockedItems((prevLockedItems) => {
      const newLockedItems = new Map(prevLockedItems);
      const currentLockedState = newLockedItems.get(category);

      newLockedItems.set(category, {
        blocked: !currentLockedState?.blocked,
        id: currentLockedState?.blocked ? null : id,
      });

      return newLockedItems;
    });
  };

  const handleGenerate = async () => {
    setQueryParams({
      feature_id: lockedItems.get("feature")?.id ?? null,
      change_id: lockedItems.get("change")?.id ?? null,
      cause_id: lockedItems.get("cause")?.id ?? null,
      character_id: lockedItems.get("character")?.id ?? null,
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
