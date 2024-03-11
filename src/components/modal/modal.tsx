import React, { useEffect, ReactNode, FC } from "react";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
// import PropTypes from "prop-types";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IModal {
  onClose: () => void;
  header?: string;
  children: ReactNode;
  title?: string
}

const Modal: FC<IModal> = ({ children, title, /*isVisible*/ onClose }) => {


  React.useEffect(() => {
    function escapePress(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      };
    };

    document.addEventListener("keydown", escapePress);

    return () => {
      document.removeEventListener("keydown", escapePress);
    };
  },
    [onClose]
  );

  const modalRoot = document.querySelector("#react-modals");
  return ReactDOM.createPortal((
    <>
      <div className={styles.container}>
        <div className={styles.content} >
          {title && (
            <header className={`${styles.header} mt-10 ml-10 mr-10`}>
              <h2 className="text text_type_main-large">{title}</h2>
            </header>
          )}
          <button className={styles.closeIcon} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
      </div>
      <ModalOverlay /*isVisible={isVisible}*/ onClose={onClose} />
    </>
  ),
    modalRoot as HTMLElement
  );
};

// Modal.propTypes = {
//   title: PropTypes.string,
//   onClose: PropTypes.func,
//   isVisible: PropTypes.bool
// };

export default Modal;
