"use client";

import styles from "./Card.module.scss";
import React from "react";
import Locker from "~/app/_components/Locker";

interface Category {
  polish: string;
  english: string;
}

interface Item {
  id: number;
  polish: string;
  english: string;
}

interface CardProps {
  category: Category;
  item: Item;
  locked: boolean;
  language: "pl" | "en";
  onLockToggle: () => void;
}

const Card: React.FC<CardProps> = ({
  category,
  item,
  locked = false,
  language,
  onLockToggle,
}) => {
  const isPolish = language === "pl" || !language;

  return (
    <div className={styles.card}>
      <button className={styles.button} data-testid="button-locked">
        <Locker locked={locked} onLockToggle={onLockToggle} />
      </button>

      <div
        data-testid="content"
        className={`${styles.content} ${locked ? "locked" : ""}`}
      >
        <p>{isPolish ? category.polish : category.english}</p>
        <h1>{isPolish || !language ? item.polish : item.english}</h1>
      </div>
    </div>
  );
};
export default Card;
