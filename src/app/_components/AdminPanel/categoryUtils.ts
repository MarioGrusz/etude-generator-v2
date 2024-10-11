import { categoryNames } from "./constants";

export const getSelectedCategoryName = (categoryParams: string) =>
  categoryNames.find((cat) => cat.key === categoryParams) ?? null;
