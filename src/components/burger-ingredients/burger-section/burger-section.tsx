import React, { FC, ReactNode } from "react";
// import PropTypes from 'prop-types';
import styles from './burger-section.module.css';
import BurgerCard from '../../burger-ingredients/burger-card/burger-card';
interface IBurgerSection {
  title: string,
  children: ReactNode | typeof BurgerCard
  id: string
}


const BurgerSection: FC<IBurgerSection> = ({ title, children, id }) => {

  return (
    <div className={styles.container} id={id}>
      <h2 className="text text_type_main-medium">{title}</h2>
      <div className={styles.children}>
        {children}
      </div>
    </div>
  );
}

// BurgerSection.propTypes = {
//   title: PropTypes.string,
//   children: PropTypes.node,
//   id: PropTypes.string
// }

export default BurgerSection