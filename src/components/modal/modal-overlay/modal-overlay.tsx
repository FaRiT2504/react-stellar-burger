import { FC, MouseEventHandler } from "react"
// import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

interface IModalOverlay {
  onClose: () => void
}

const ModalOverlay: FC<IModalOverlay> = ({ onClose,/* children*/ }: IModalOverlay) => {
  // function overlayClose(e: KeyboardEvent) {
  //   if (e.target === e.currentTarget) {
  //     onClose();
  //   };
  // };
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      {/* {children} */}
    </div>
  );
};

// ModalOverlay.propTypes = {
//   onClose: PropTypes.func,
// };

export default ModalOverlay;