"use client";

import styles from "./Generator.module.scss";
import React, { useState } from "react";
import Image from "next/image";
import designerBoy from "~/app/assets/designer_boy.webp";
import monster from "~/app/assets/monster.png";
import SwitchBar from "~/app/_components/SwitchBar";
import Smile from "~/app/_components/Smile";
import Card from "~/app/_components/Card";
import { useLocalStorage } from "~/app/hooks/useLocalStorage";
import { getYear } from "~/app/utils/currentYear";
import useGenerator from "./useGenerator";

interface Item {
  id: number;
  polish: string;
  english: string;
}

const categoryNames = [
  { polish: "cecha", english: "feature" },
  { polish: "zmiana", english: "change" },
  { polish: "przyczyna", english: "cause" },
  { polish: "charakter", english: "character" },
];

const currentYear = getYear();

const Generator = () => {
  const { lockedItems, toggleLock, handleGenerate, data, isLoading, error } =
    useGenerator();

  const { getItem: languageGetItem } = useLocalStorage("language");
  const [language, setLanguage] = useState<"en" | "pl">(
    languageGetItem || "pl"
  );
  const isPolish = language === "pl" || !language;

  if (isLoading) return <Smile />;
  if (error)
    return <div>Oops! Something went wrong. Please try again later.</div>;

  const items = [
    data?.result.feature,
    data?.result.change,
    data?.result.cause,
    data?.result.character,
  ];

  return (
    <main className={styles.mainContainer}>
      <SwitchBar
        language={language}
        setLanguage={setLanguage}
        aria-label="Language Switcher"
      />
      <section className={styles.headerSection}>
        <Image
          className={styles.boyImage}
          src={designerBoy}
          alt="Illustration of a designer boy character"
          priority={true}
        />
        <header className={styles.headerMain}>
          <h1>{isPolish ? "generator etiud™" : "etude generator™"}</h1>
        </header>
      </section>
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
              item={item as Item}
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
        aria-label={
          isPolish ? "Generuj wszystkie etudy" : "Generate all etudes"
        }
      >
        <span>{isPolish ? "generuj" : "generate"}</span>
      </button>
      <footer className={styles.footer}>
        <p>© {currentYear} Pracownia Animacji i Działań Wizualizacyjnych</p>
        <p className={styles.developedBy}>
          Developed by{" "}
          <a
            href="https://mariuszgruszczynski.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Mariusz Gruszczynski's Portfolio Website"
          >
            <Image
              className={styles.monster}
              src={monster}
              alt="Illustration of a designer boy character"
            />
          </a>
        </p>
      </footer>
    </main>
  );
};

export default Generator;
