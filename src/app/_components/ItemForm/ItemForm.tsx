import React from "react";
import { type ItemToInsert, type Category } from "./interfaces";
import styles from "./ItemForm.module.scss";

interface ItemFormProps {
  newItem: ItemToInsert;
  selectedCategoryName: Category | null;
  isPolish: boolean;
  setNewItem: React.Dispatch<React.SetStateAction<ItemToInsert>>;
  onAddNewItem: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({
  newItem,
  selectedCategoryName,
  isPolish,
  setNewItem,
  onAddNewItem,
}) => (
  <article className={styles.formContainer} aria-labelledby="add-new-item">
    <h2 id="add-new-item">
      {isPolish
        ? "Dodaj nowy element do kategorii: "
        : "Add New Item to category: "}
      <span>
        {selectedCategoryName &&
          (isPolish
            ? selectedCategoryName.polish
            : selectedCategoryName.english)}
      </span>
    </h2>
    <form role="form">
      <div>
        <label>
          {isPolish ? "Polskie słowo" : "English Word"}
          <input
            type="text"
            name="polish"
            placeholder={
              isPolish ? "Wpisz polskie słowo" : "Enter English word"
            }
            value={newItem.polish}
            onChange={(e) => setNewItem({ ...newItem, polish: e.target.value })}
          />
        </label>
      </div>

      <div>
        <label>
          {isPolish ? "Angielskie tłumaczenie" : "Polish Translation"}
          <input
            type="text"
            name="english"
            placeholder={
              isPolish
                ? "Wpisz angielskie tłumaczenie"
                : "Enter Polish translation"
            }
            value={newItem.english}
            onChange={(e) =>
              setNewItem({ ...newItem, english: e.target.value })
            }
          />
        </label>
      </div>

      <button type="button" onClick={onAddNewItem}>
        {isPolish ? "Dodaj element" : "Add Item"}
      </button>
    </form>
  </article>
);

export default ItemForm;
