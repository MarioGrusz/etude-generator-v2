"use client";

import React, { useState, useCallback } from "react";
import styles from "./AdminPanel.module.scss";
import SwitchBar from "~/app/_components/SwitchBar/";
import Modal from "~/app/_components/Modal";
import Smile from "~/app/_components/Smile";
import CategoryMenu from "~/app/_components/CategoryMenu";
import ItemForm from "~/app/_components/ItemForm";
import ItemList from "~/app/_components/ItemList";
import { useLocalStorage } from "~/app/hooks/useLocalStorage";
import { useCategoryData } from "./hooks/useCategoryData";
import { useInsertData } from "./hooks/useInsertData";
import { useDeleteData } from "./hooks/useDeleteData";
import { type Category, type Item, type ItemToInsert } from "./interfaces";
import { getSelectedCategoryName } from "./categoryUtils";

const AdminPanel = () => {
  const { getItem: languageGetItem } = useLocalStorage("language");
  const [language, setLanguage] = useState<"en" | "pl">(
    languageGetItem ?? "pl"
  );

  const [categoryParams, setCategoryParams] = useState("feature");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<ItemToInsert>({
    category: "",
    polish: "",
    english: "",
  });
  const [itemToDelete, setItemToDelete] = useState<{
    category: Category;
    item: Item;
  } | null>(null);

  const { data: category, isLoading, error } = useCategoryData(categoryParams);
  const { mutate: insertData } = useInsertData();
  const { mutate: deleteData } = useDeleteData();

  const selectedCategoryName = getSelectedCategoryName(categoryParams);
  const isPolish = language === "pl";

  const handleDeleteClick = useCallback((category: Category, item: Item) => {
    setIsModalOpen(true);
    setItemToDelete({ category, item });
  }, []);

  const handleDeleteItem = () => {
    deleteData({
      category: itemToDelete?.category.key ?? "",
      id: itemToDelete?.item.id ?? 0,
    });
    setIsModalOpen(false);
  };

  const handleAddNewItem = useCallback(() => {
    if (selectedCategoryName && newItem.polish && newItem.english) {
      insertData(newItem);
      setNewItem({ category: "", polish: "", english: "" });
    }
  }, [insertData, newItem, selectedCategoryName]);

  if (isLoading) return <Smile />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className={styles.adminPanel}>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        itemInfo={itemToDelete}
        isPolish={isPolish}
        deleteFn={handleDeleteItem}
      />

      <header className={styles.adminPanel__header}>
        <h1>Admin Panel</h1>
        <SwitchBar language={language} setLanguage={setLanguage} />
      </header>

      <section className={styles.adminPanel__forms}>
        <CategoryMenu
          isPolish={isPolish}
          onCategorySelect={setCategoryParams}
        />

        <section className={styles.adminPanel__displayCategories}>
          <ItemList
            categoryItems={category ?? []}
            selectedCategoryName={selectedCategoryName}
            isPolish={isPolish}
            onDelete={handleDeleteClick}
          />

          <ItemForm
            newItem={newItem}
            selectedCategoryName={selectedCategoryName}
            isPolish={isPolish}
            setNewItem={setNewItem}
            onAddNewItem={handleAddNewItem}
          />
        </section>
      </section>
    </main>
  );
};

export default AdminPanel;
