import { api } from "~/trpc/react";

export const useCategoryData = (specifier: string) => {
  if (!specifier) {
    return {
      data: null,
      isLoading: false,
      error: null,
    };
  }

  const categories = ["cause", "change", "character", "feature"];

  if (!categories.includes(specifier)) {
    throw new Error(`Invalid category specifier: ${specifier}`);
  }

  const { data, isLoading, error } = api.data.getCategoryData.useQuery({
    specifier,
  });

  return {
    data,
    isLoading,
    error,
  };
};
