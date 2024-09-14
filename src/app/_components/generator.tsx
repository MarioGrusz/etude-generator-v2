"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import styles from "./generator.module.scss";
import React, { useState, useEffect } from "react";
import designerBoy from "~/app/assets/designer_boy.png";
import SwitchBar from "./SwitchBar";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Card from "./Card";
import { getYear } from "../utils/currentYear";
import Smile from "./Smile";
import { api } from "~/trpc/react";
import Image from "next/image";

interface Item {
  id: number;
  polish: string;
  english: string;
}

const Generator = () => {
  const { data, error, isLoading } = api.data.fetchData.useQuery({
    specifier: "all",
  });

  const { getItem: languageGetItem } = useLocalStorage("language");
  const { setItem: setData } = useLocalStorage("data");

  const [language, setLanguage] = useState<"en" | "pl">(
    languageGetItem || "pl"
  );
  const [locked, setLocked] = useState<boolean[]>([false, false, false, false]);

  const [categories, setCategories] = useState<Item[][]>([]);
  const categoryNames = [
    { polish: "cecha", english: "feature" },
    { polish: "zmiana", english: "change" },
    { polish: "przyczyna", english: "cause" },
    { polish: "charakter", english: "character" },
  ];

  const [items, setItems] = useState<Item[]>([]);
  const isPolish = language === "pl" || !language;

  useEffect(() => {
    if (data) {
      const newCategories: Item[][] = [];
      const newItems: Item[] = [];

      if (data.feature) {
        newCategories.push(data.feature);
        if (data.feature[0]) {
          newItems.push(data.feature[0]);
        }
      }

      if (data.change) {
        newCategories.push(data.change);
        if (data.change[0]) {
          newItems.push(data.change[0]);
        }
      }

      if (data.cause) {
        newCategories.push(data.cause);
        if (data.cause[0]) {
          newItems.push(data.cause[0]);
        }
      }

      if (data.character) {
        newCategories.push(data.character);
        if (data.character[0]) {
          newItems.push(data.character[0]);
        }
      }

      setCategories(newCategories);
      setItems(newItems);
      setData(data);
    }
  }, [data]);

  const toggleLock = (index: number) => {
    setLocked((prevLocked) => {
      const newLocked = [...prevLocked];
      newLocked[index] = !newLocked[index];
      return newLocked;
    });
  };

  const getRandomIndices = React.useCallback(() => {
    return categories.map((category) =>
      Math.floor(Math.random() * category.length)
    );
  }, [categories]);

  const shuffleAll = () => {
    const randomIndices = getRandomIndices();

    const newItems = items
      .map((item, index) => {
        if (categories[index] && categories[index].length > 0) {
          const randomIndex = randomIndices[index];
          if (randomIndex)
            return locked[index] ? item : categories[index][randomIndex];
        }
        return item;
      })
      .filter((item): item is Item => item !== undefined);
    setItems(newItems);
  };

  const currentYear = getYear();

  if (isLoading) return <Smile />;
  if (error)
    return <div>Oops! Something went wrong. Please try again later.</div>;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
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
          const isLocked = locked[index];

          if (!category || isLocked === undefined) {
            return null;
          }
          return (
            <Card
              key={index}
              category={category}
              item={item}
              locked={isLocked}
              language={language}
              onLockToggle={() => toggleLock(index)}
            />
          );
        })}
      </section>
      <button
        className={styles.generator}
        onClick={shuffleAll}
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
            Mariusz Gruszczynski
          </a>
        </p>
      </footer>
    </main>
  );
};

export default Generator;
