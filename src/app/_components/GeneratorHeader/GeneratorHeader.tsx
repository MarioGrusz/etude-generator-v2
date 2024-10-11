import React from "react";
import Image from "next/image";
import styles from "./GeneratorHeader.module.scss";
import designerBoy from "~/app/assets/designer_boy.webp";

interface HeaderSectionProps {
  title: string;
}

const GeneratorHeader: React.FC<HeaderSectionProps> = ({ title }) => (
  <section className={styles.headerSection}>
    <Image
      className={styles.boyImage}
      src={designerBoy}
      alt="Illustration of a designer boy character"
      priority
    />
    <header className={styles.headerMain}>
      <h1>{title}</h1>
    </header>
  </section>
);

export default GeneratorHeader;
