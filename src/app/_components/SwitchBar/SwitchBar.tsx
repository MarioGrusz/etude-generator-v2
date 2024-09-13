import "./style.scss";
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
    <div className="switch">
      <a
        href=""
        //className={`switch-pl ${language === "pl" ? "active" : ""}`}
        className={`switch-pl ${isPolish ? "active" : ""}`}
        onClick={(event) => handleLanguageChange(event, "pl")}
      >
        <span className="image">
          <PolishFlag />
          <span className="text">{isPolish ? "POLSKI" : "POLISH"}</span>
        </span>
      </a>
      <a
        href=""
        className={`switch-en ${language === "en" ? "active" : ""}`}
        onClick={(event) => handleLanguageChange(event, "en")}
      >
        <span className="image">
          <EnglishFlag />
          <span className="text">{isPolish ? "ANGIELSKI" : "ENGLISH"}</span>
        </span>
      </a>
    </div>
  );
};

export default SwitchBar;
