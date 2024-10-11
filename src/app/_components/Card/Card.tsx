"use client";

import styles from "./Card.module.scss";
import React from "react";
import Locker from "~/app/_components/Locker";
import { type CardProps } from "./interfaces";

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
      <div className={styles.button} data-testid="button-locked">
        <Locker locked={locked} onLockToggle={onLockToggle} />
      </div>

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
