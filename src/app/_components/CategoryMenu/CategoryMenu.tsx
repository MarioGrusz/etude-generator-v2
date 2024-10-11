import React from "react";
import { categoryNames } from "./categoryNames";
import styles from "./Category.module.scss";

interface CategoryMenuProps {
  isPolish: boolean;
  onCategorySelect: (categoryKey: string) => void;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  isPolish,
  onCategorySelect,
}) => (
  <nav className={styles.categoryMenu} aria-label="Category navigation">
    <ul>
      {categoryNames.map((category) => (
        <li key={category.key}>
          <button onClick={() => onCategorySelect(category.key)}>
            {isPolish ? category.polish : category.english}
          </button>
        </li>
      ))}
    </ul>
  </nav>
);

export default CategoryMenu;
