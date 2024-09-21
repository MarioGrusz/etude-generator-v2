/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import styles from "./Admin.module.scss";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import SwitchBar from "~/app/_components/SwitchBar/";
import Modal from "~/app/_components/Modal";
import { useLocalStorage } from "~/app/hooks/useLocalStorage";
import { useData } from "~/app/context/DataContext";

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

interface ItemForDatabase {
  category: string;
  polish: string;
  english: string;
}

const categoryNames: Category[] = [
  { key: "feature", polish: "cecha", english: "feature" },
  { key: "change", polish: "zmiana", english: "change" },
  { key: "cause", polish: "przyczyna", english: "cause" },
  { key: "character", polish: "charakter", english: "character" },
];

const AdminPanel = () => {
  const { data, isLoading, error, insertData } = useData();
  const { getItem: getLanguageFromLocalStorage } = useLocalStorage("language");
  const [language, setLanguage] = useState<"en" | "pl">("pl");
  const [itemToDelete, setItemToDelete] = useState<{
    category: Category;
    item: Item;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [newItem, setNewItem] = useState<ItemForDatabase>({
    category: "",
    polish: "",
    english: "",
  });

  useEffect(() => {
    const storedLanguage = getLanguageFromLocalStorage();
    if (storedLanguage) setLanguage(storedLanguage as "en" | "pl");
  }, [getLanguageFromLocalStorage]);

  const isPolish = language === "pl" || !language;

  const allCategoryItems = useMemo(
    () => (selectedCategory ? data?.[selectedCategory.key] ?? [] : []),
    [data, selectedCategory]
  );

  const handleCategoryClick = useCallback((category: Category) => {
    setSelectedCategory(category);
    setNewItem({ category: category.english, polish: "", english: "" });
  }, []);

  const handleNewItemChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (selectedCategory) {
        setNewItem((prevItem) => ({
          ...prevItem,
          [name]: value,
        }));
      }
    },
    [selectedCategory]
  );

  const handleAddNewItem = useCallback(() => {
    if (selectedCategory && newItem.polish && newItem.english) {
      insertData(newItem);
      setNewItem({ category: "", polish: "", english: "" });
    }
  }, [insertData, newItem, selectedCategory]);

  const handleDeleteClick = useCallback((category: Category, item: Item) => {
    setIsModalOpen(true);
    setItemToDelete({ category, item });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <main className={styles.adminPanel}>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        itemInfo={itemToDelete}
        isPolish={isPolish}
      />
      <header className={styles.adminPanel__header}>
        <h1>Admin Panel</h1>
        <SwitchBar
          language={language}
          setLanguage={setLanguage}
          aria-label="Language Switcher"
        />
      </header>

      <section className={styles.adminPanel__forms}>
        <aside className={styles.categoryMenu} aria-label="Category List">
          <ul>
            {categoryNames.map((category) => (
              <li key={category.key}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  aria-pressed={selectedCategory?.key === category.key}
                >
                  {isPolish ? category.polish : category.english}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className={styles.adminPanel__displayCategories}>
          <div className={styles.words}>
            <h1>
              {selectedCategory
                ? isPolish
                  ? selectedCategory.polish
                  : selectedCategory.english
                : isPolish
                ? "Wybierz kategorie"
                : "Please select Category"}
            </h1>
            {allCategoryItems.map((item, index) => (
              <div key={index} className={styles.itemWrapper}>
                <p>{isPolish ? item.polish : item.english}</p>
                <button
                  onClick={() => handleDeleteClick(selectedCategory!, item)}
                >
                  {isPolish ? "Usun" : "Remove"}
                </button>
              </div>
            ))}
          </div>

          <div className={styles.adminPanel__formContainer}>
            <h2>
              {isPolish
                ? "Dodaj nowy element do kategorii: "
                : "Add New Item to category: "}
              <span>
                {selectedCategory &&
                  (isPolish
                    ? selectedCategory.polish
                    : selectedCategory.english)}
              </span>
            </h2>
            <form role="form">
              <div>
                <label htmlFor="polishWord">
                  {isPolish ? "Polskie słowo" : "English Word"}
                  <input
                    type="text"
                    name={isPolish ? "polish" : "english"}
                    placeholder={
                      isPolish ? "Wpisz polskie słowo" : "Enter English word"
                    }
                    value={isPolish ? newItem.polish : newItem.english}
                    onChange={handleNewItemChange}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="englishWord">
                  {isPolish ? "Angielskie tłumaczenie" : "Polish Translation"}
                  <input
                    type="text"
                    name={isPolish ? "english" : "polish"}
                    placeholder={
                      isPolish
                        ? "Wpisz angielskie tłumaczenie"
                        : "Enter Polish translation"
                    }
                    value={isPolish ? newItem.english : newItem.polish}
                    onChange={handleNewItemChange}
                  />
                </label>
              </div>

              <button type="button" onClick={handleAddNewItem}>
                {language === "pl" ? "Dodaj element" : "Add Item"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminPanel;
