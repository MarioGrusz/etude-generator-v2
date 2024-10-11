"use client";

import React, { useRef, useEffect } from "react";
import styles from "./Modal.module.scss";
import { type ModalProps } from "./interfaces";

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  itemInfo,
  isPolish,
  deleteFn,
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const labels = {
    question: isPolish
      ? "Czy na pewno chcesz usunąć słowo: "
      : "Are you shure you want to delete word: ",
    fromCategory: isPolish ? "z kategorii: " : "from category: ",
    cancel: isPolish ? "cofnij" : "cancel",
    delete: isPolish ? "usuń" : "delete",
  };

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
        {labels.question}
        <strong>
          {isPolish ? itemInfo?.item.polish : itemInfo?.item.english}
        </strong>{" "}
        {labels.fromCategory}
        <strong>
          {isPolish ? itemInfo?.category.polish : itemInfo?.category.english}
        </strong>
      </p>
      <div className={styles.btnsWrapper}>
        <button onClick={handleCloseModal}>{labels.cancel}</button>
        <button onClick={deleteFn} className={styles.modalDeleteBtn}>
          {labels.delete}
        </button>
      </div>
    </dialog>
  );
};

export default Modal;
