interface Item {
  id?: number;
  polish: string;
  english: string;
}

interface Category {
  key: string;
  polish: string;
  english: string;
}

export interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  itemInfo: { category: Category; item: Item } | null;
  isPolish: boolean;
  deleteFn: () => void;
}
