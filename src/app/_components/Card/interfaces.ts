interface Category {
  polish: string;
  english: string;
}

interface Item {
  id: number;
  polish: string;
  english: string;
}

export interface CardProps {
  category: Category;
  item: Item;
  locked: boolean;
  language: "pl" | "en";
  onLockToggle: () => void;
}
