"use client";
import styles from "./locker.module.scss";

type LockIconProps = {
  locked: boolean;
  onLockToggle: () => void;
};

const Locker: React.FC<LockIconProps> = ({ locked, onLockToggle }) => {
  return (
    <div role="button" className={styles.lockerButton} onClick={onLockToggle}>
      {locked ? (
        <svg
          data-testid="locked"
          viewBox="0 0 51 64"
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles.locker} ${locked ? "locked" : "unlocked"}`}
        >
          <path
            fill="#FFF"
            fillRule="evenodd"
            d="M6.5 25.6v-6.4C6.5 8.5952 15.0056667 0 25.5 0s19 8.5952 19 19.2v6.4h.1666667C48.1658333 25.6 51 28.464 51 32v25.6c0 3.536-2.8341667 6.4-6.3333333 6.4H6.3333333C2.83416667 64 0 61.136 0 57.6V32c0-3.52 2.85-6.4 6.3333333-6.4H6.5zm15.8333333 21.536V54.4h6.3333334v-7.264c1.9063333-1.1264 3.1666666-3.1872 3.1666666-5.5424 0-3.536-2.8341666-6.4-6.3333333-6.4-3.4991667 0-6.3333333 2.864-6.3333333 6.4 0 2.3552 1.2603333 4.416 3.1381666 5.5264l.0285.016zM16 19.2v6.4h19v-6.4c0-5.3024-4.2528333-9.6-9.5-9.6S16 13.8976 16 19.2z"
            className={styles.locker}
          ></path>
        </svg>
      ) : (
        <svg
          data-testid="unlocked"
          viewBox="0 0 51 64"
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles.locker}  ${locked ? "locked" : "unlocked"}`}
        >
          <path
            fill=""
            fillRule="evenodd"
            d="M6.5 25.6v-6.4C6.5 8.5952 15.0056667 0 25.5 0s19 8.5952 19 19.2H35v6.4h9.6666667C48.1658333 25.6 51 28.464 51 32v25.6c0 3.536-2.8341667 6.4-6.3333333 6.4h3H6.3333333C2.83416667 64 0 61.136 0 57.6V32c0-3.52 2.85-6.4 6.3333333-6.4H6.5zm15.8333333 21.536V54.4h6.3333334v-7.264c1.9063333-1.1264 3.1666666-3.1872 3.1666666-5.5424 0-3.536-2.8341666-6.4-6.3333333-6.4-3.4991667 0-6.3333333 2.864-6.3333333 6.4 0 2.3552 1.2603333 4.416 3.1381666 5.5264l.0285.016zM16 19.2v6.4h19v-6.4c0-5.3024-4.2528333-9.6-9.5-9.6S16 13.8976 16 19.2z"
            className={styles.locker}
          ></path>
        </svg>
      )}
    </div>
  );
};

export default Locker;
