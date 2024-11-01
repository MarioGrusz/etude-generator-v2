/* eslint-disable @typescript-eslint/consistent-type-imports */
import { QueryResultRow } from "pg";

export interface Client {
  query: (queryText: string, values?: unknown[]) => Promise<unknown>;
  release?: () => void;
}

export interface QueryResult {
  rows: QueryResultRow[];
}

export interface ItemsIds {
  feature: number | null;
  change: number | null;
  cause: number | null;
  character: number | null;
}

export interface Item {
  id: number;
  polish: string;
  english: string;
}

// export interface Result {
//   result: {
//     feature: Item;
//     change: Item;
//     cause: Item;
//     character: Item;
//   };
// }

export interface Result {
  feature: Item | null;
  change: Item | null;
  cause: Item | null;
  character: Item | null;
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
