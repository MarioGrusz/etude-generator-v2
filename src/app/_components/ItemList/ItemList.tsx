import React from "react";
import { type Category, type Item } from "./interfaces";
import styles from "./ItemList.module.scss";

interface ItemListProps {
  categoryItems: Item[];
  selectedCategoryName: Category | null;
  isPolish: boolean;
  onDelete: (category: Category, item: Item) => void;
}

const ItemList: React.FC<ItemListProps> = ({
  categoryItems,
  selectedCategoryName,
  isPolish,
  onDelete,
}) => (
  <article className={styles.words} aria-labelledby="selected-category">
    <h1>
      {selectedCategoryName
        ? isPolish
          ? selectedCategoryName.polish
          : selectedCategoryName.english
        : isPolish
        ? "Wybierz jedną kategorię"
        : "Please select Category"}
    </h1>
    {categoryItems.map((item, index) => (
      <div key={index} className={styles.itemWrapper}>
        <p>{isPolish ? item.polish : item.english}</p>
        <button
          onClick={() =>
            selectedCategoryName && onDelete(selectedCategoryName, item)
          }
        >
          {isPolish ? "Usuń" : "Remove"}
        </button>
      </div>
    ))}
  </article>
);

export default ItemList;
