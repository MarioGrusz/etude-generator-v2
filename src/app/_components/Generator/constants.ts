export const INITIAL_LOCKED_ITEMS = new Map([
  ["feature", { blocked: false, id: null }],
  ["change", { blocked: false, id: null }],
  ["cause", { blocked: false, id: null }],
  ["character", { blocked: false, id: null }],
]);

export const INITIAL_QUERY_PARAMS = {
  feature: null,
  change: null,
  cause: null,
  character: null,
};

export const Categories = {
  FEATURE: "feature",
  CHANGE: "change",
  CAUSE: "cause",
  CHARACTER: "character",
};
