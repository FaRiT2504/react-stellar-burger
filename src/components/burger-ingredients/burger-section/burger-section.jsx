import PropTypes from 'prop-types';
import React from "react";
import styles from './burger-section.module.css';

function BurgerSection({ title, children, id }) {

  return (
    <div className={styles.container} id={id}>
      <h2 className="text text_type_main-medium">{title}</h2>
      <div className={styles.children}>
        {children}
      </div>
    </div>
  );
}

BurgerSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.string
}

export default BurgerSection