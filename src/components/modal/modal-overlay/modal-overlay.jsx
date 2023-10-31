import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

function ModalOverlay({ onClose, children, isVisible }) {
  function overlayClose(e) {
    if (e.target === e.currentTarget) {
      onClose();
    };
  };
  return (
    <div className={isVisible && styles.modalOverlay} onClick={overlayClose}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
};

export default ModalOverlay;