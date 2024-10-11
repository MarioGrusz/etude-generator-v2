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
  feature_id: number | null;
  change_id: number | null;
  cause_id: number | null;
  character_id: number | null;
}

export interface Category {
  key: string;
  polish: string;
  english: string;
}
