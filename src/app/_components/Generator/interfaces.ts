export interface Item {
  id: number;
  polish: string;
  english: string;
}

export interface ToggleAttributes {
  blocked?: boolean;
  id: number | null;
}

export interface QueryParams {
  feature: number | null;
  change: number | null;
  cause: number | null;
  character: number | null;
}

export interface Category {
  key: string;
  polish: string;
  english: string;
}
