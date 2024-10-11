/* eslint-disable @typescript-eslint/consistent-type-imports */
import { QueryResultRow } from "pg";

export interface Client {
  query: (queryText: string, values?: unknown[]) => Promise<unknown>;
  release(): unknown;
}

export interface QueryResult {
  rows: QueryResultRow[];
}

export interface Ids {
  feature_id: number | null;
  change_id: number | null;
  cause_id: number | null;
  character_id: number | null;
}

export interface Item {
  id: number;
  polish: string;
  english: string;
}

export interface Result {
  result: {
    feature: Item;
    change: Item;
    cause: Item;
    character: Item;
  };
}

export interface ItemToInsert {
  category: string;
  polish: string;
  english: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  createdAt?: Date;
}
