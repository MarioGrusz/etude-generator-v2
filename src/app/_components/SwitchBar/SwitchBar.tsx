"use client";

import styles from "./switchbar.module.scss";
import React from "react";
import PolishFlag from "./Flags/PolishFlag";
import EnglishFlag from "./Flags/EnglishFlag";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface SwitchBarProps {
  language: "en" | "pl";
  setLanguage: (newLanguage: "en" | "pl") => void;
}

const SwitchBar: React.FC<SwitchBarProps> = ({ language, setLanguage }) => {
  const { setItem: languageSetItem } = useLocalStorage("language");

  const handleLanguageChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    newLanguage: "en" | "pl"
  ) => {
    event.preventDefault();
    setLanguage(newLanguage);
    languageSetItem(newLanguage);
  };

  const isPolish = language === "pl" || !language;

  return (
    <div className={styles.switch}>
      <a
        href=""
        className={`${styles.switchPl} ${isPolish ? styles.active : ""}`}
        onClick={(event) => handleLanguageChange(event, "pl")}
      >
        <span className={styles.image}>
          <PolishFlag />
          <span className={styles.text}>{isPolish ? "POLSKI" : "POLISH"}</span>
        </span>
      </a>
      <a
        href=""
        className={`${styles.switchEn} ${
          language === "en" ? styles.active : ""
        }`}
        onClick={(event) => handleLanguageChange(event, "en")}
      >
        <span className={styles.image}>
          <EnglishFlag />
          <span className={styles.text}>
            {isPolish ? "ANGIELSKI" : "ENGLISH"}
          </span>
        </span>
      </a>
    </div>
  );
};

export default SwitchBar;
