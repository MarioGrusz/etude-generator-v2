import React from "react";
import Image from "next/image";
import styles from "./GeneratorFooter.module.scss";
import monster from "~/app/assets/monster.png";

interface FooterSectionProps {
  currentYear: number;
}

const GeneratorFooter: React.FC<FooterSectionProps> = ({ currentYear }) => (
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
          alt="Illustration of a monster character"
        />
      </a>
    </p>
  </footer>
);

export default GeneratorFooter;
