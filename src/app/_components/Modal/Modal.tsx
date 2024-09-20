"use client";

import React, { useRef, useEffect } from "react";
import styles from "./Modal.module.scss";

interface Item {
  id?: number;
  polish: string;
  english: string;
}

interface Category {
  key: string;
  polish: string;
  english: string;
}

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  itemInfo: { category: Category; item: Item } | null;
  isPolish: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  itemInfo,
  isPolish,
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  if (!isModalOpen) return null;

  return (
    <dialog className={styles.modal} ref={modalRef} onKeyDown={handleKeyDown}>
      <p className={styles.question}>
        {isPolish
          ? "Czy na pewno chcesz usunąć słowo: "
          : "Are you shure you want to delete word: "}
        <strong>
          {isPolish ? itemInfo?.item.polish : itemInfo?.item.english}
        </strong>{" "}
        {isPolish ? "z kategorii: " : "from category: "}
        <strong>
          {isPolish ? itemInfo?.category.polish : itemInfo?.category.english}
        </strong>
      </p>
      <div className={styles.btnsWrapper}>
        <button onClick={handleCloseModal}>
          {isPolish ? "cofnij" : "cancel"}
        </button>
        <button className={styles.modalDeleteBtn}>
          {isPolish ? "usuń" : "delete"}
        </button>
      </div>
    </dialog>
  );
};

export default Modal;
