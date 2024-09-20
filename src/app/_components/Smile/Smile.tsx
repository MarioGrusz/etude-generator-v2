"use client";
/* eslint-disable react/react-in-jsx-scope */
import styles from "./Smile.module.scss";

const Smile = () => {
  return (
    <section className={styles.smileWrapper}>
      <h1>Loading...</h1>
      <div className={styles.smileSvg}>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 96.9 96.9"
          xmlSpace="preserve"
        >
          <circle className={styles.stroke0} cx="48.4" cy="48.4" r="46.4" />
          <path
            className={styles.stroke1}
            d="M26.9,59.2L26.9,59.2c6.3,11.9,21.1,16.4,33,10.1c4.3-2.3,7.8-5.8,10.1-10l0,0"
          />
          <circle fill="#000000" cx="32.3" cy="43" r="5.4" />
          <circle fill="#000000" cx="64.6" cy="43.1" r="5.4" />
        </svg>
      </div>
    </section>
  );
};

export default Smile;
