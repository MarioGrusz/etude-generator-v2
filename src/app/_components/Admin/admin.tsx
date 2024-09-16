/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import styles from "./admin.module.scss";
import React, { useState, useEffect } from "react";
import SwitchBar from "../SwitchBar";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useData } from "~/app/context/DataContext";

interface Item {
  polish: string;
  english: string;
}

interface ItemSQL {
  categoryName: string;
  polish: string;
  english: string;
}

const AdminPanel = () => {
  const { data, isLoading, error } = useData();
  const { getItem: getLanguageFromLocalStorage } = useLocalStorage("language");
  const [language, setLanguage] = useState<"en" | "pl">("pl");

  useEffect(() => {
    const storedLanguage = getLanguageFromLocalStorage();
    if (storedLanguage) {
      setLanguage(storedLanguage as "en" | "pl");
    }
  }, [getLanguageFromLocalStorage]);

  const isPolish = language === "pl" || !language;

  const categoryNames = [
    { key: "feature", polish: "cecha", english: "feature" },
    { key: "change", polish: "zmiana", english: "change" },
    { key: "cause", polish: "przyczyna", english: "cause" },
    { key: "character", polish: "charakter", english: "character" },
  ];

  const [selectedCategory, setSelectedCategory] = useState<{
    key: string;
    polish: string;
    english: string;
  } | null>(null);

  const [newItem, setNewItem] = useState<ItemSQL>({
    categoryName: "",
    polish: "",
    english: "",
  });

  const [itemToSend, setItemToSent] = useState<ItemSQL | null>(null);

  const [allCategoryItems, setAllCategoryItems] = useState<Item[]>([]);

  const handleCategoryClick = (category: {
    key: string;
    polish: string;
    english: string;
  }) => {
    setSelectedCategory(category);
    if (data) setAllCategoryItems(data[category.key] ?? []);
    setNewItem({
      categoryName: category.english,
      polish: "",
      english: "",
    });
  };

  const handleNewItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (selectedCategory)
      setNewItem((prevItem) => ({
        ...prevItem,
        categoryName: selectedCategory.english,
        [name]: value,
      }));
  };

  const handleAddNewItem = () => {
    if (selectedCategory && newItem.polish && newItem.english) {
      console.log("NEW", newItem);
      setItemToSent(newItem);
      //setAllCategoryItems((prevItems) => [...prevItems, newItem]);
      setNewItem({ categoryName: "", polish: "", english: "" });
    }
  };

  useEffect(() => {
    console.log(itemToSend);
  }, [itemToSend]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <main className={styles.adminPanel}>
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
            {selectedCategory ? (
              <h1>
                {isPolish ? selectedCategory.polish : selectedCategory.english}
              </h1>
            ) : (
              <h1>
                {isPolish ? "Wybierz kategorie" : "Please select Category"}
              </h1>
            )}
            {allCategoryItems.map((item, index) => (
              <div key={index} className={styles.itemWrapper}>
                <p> {isPolish ? item.polish : item.english}</p>
                <button
                  onClick={() => {
                    const filteredItems = allCategoryItems.filter(
                      (existingItem) => existingItem !== item
                    );
                    setAllCategoryItems(filteredItems);
                  }}
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
