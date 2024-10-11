"use client";

import React, { useState } from "react";
import styles from "./Generator.module.scss";
import SwitchBar from "~/app/_components/SwitchBar";
import Smile from "~/app/_components/Smile";
import Card from "~/app/_components/Card";
import { useLocalStorage } from "~/app/hooks/useLocalStorage";
import { getYear } from "~/app/utils/currentYear";
import useGenerator from "./useGenerator";
import { type Item } from "./interfaces";
import { categoryNames } from "./categoryNames";
import GeneratorHeader from "~/app/_components/GeneratorHeader";
import GeneratorFooter from "~/app/_components/GeneratorFooter";

const currentYear = getYear();

const Generator: React.FC = () => {
  const { lockedItems, toggleLock, handleGenerate, data, isLoading, error } =
    useGenerator();

  const { getItem: languageGetItem } = useLocalStorage("language");
  const [language, setLanguage] = useState<"en" | "pl">(
    languageGetItem || "pl"
  );

  const isPolish = language === "pl";

  const items: Array<Item | null> = [
    ...(data ? [data[0]?.result.feature ?? null] : []),
    ...(data ? [data[0]?.result.change ?? null] : []),
    ...(data ? [data[0]?.result.cause ?? null] : []),
    ...(data ? [data[0]?.result.character ?? null] : []),
  ];

  console.log("ITEMS", items);

  const labels = {
    title: isPolish ? "generator etiud™" : "etude generator™",
    generateButton: isPolish ? "generuj" : "generate",
    generateAllAria: isPolish
      ? "Generuj wszystkie etudy"
      : "Generate all etudes",
    errorMessage: "Oops! Something went wrong. Please try again later.",
  };

  if (isLoading) return <Smile />;
  if (error) return <div>{labels.errorMessage}</div>;

  return (
    <main className={styles.mainContainer}>
      <SwitchBar
        language={language}
        setLanguage={setLanguage}
        aria-label="Language Switcher"
      />

      <GeneratorHeader title={labels.title} />

      <section
        className={styles.cardContainer}
        aria-labelledby="card-section-title"
      >
        {items.map((item, index) => {
          const category = categoryNames[index];
          if (!category) return null;

          const isBlocked = lockedItems.get(category.english)?.blocked ?? false;
          return (
            <Card
              key={index}
              category={category}
              item={item!}
              locked={isBlocked}
              language={language}
              onLockToggle={() =>
                toggleLock(category.english, item?.id ?? null)
              }
            />
          );
        })}
      </section>

      <button
        onClick={handleGenerate}
        className={styles.generator}
        aria-label={labels.generateAllAria}
      >
        <span>{labels.generateButton}</span>
      </button>

      <GeneratorFooter currentYear={currentYear} />
    </main>
  );
};

export default Generator;
