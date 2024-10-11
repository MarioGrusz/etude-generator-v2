export interface Category {
  key: string;
  polish: string;
  english: string;
}

export interface Item {
  id?: number;
  polish: string;
  english: string;
}

export interface ItemToInsert {
  category: string;
  polish: string;
  english: string;
}
