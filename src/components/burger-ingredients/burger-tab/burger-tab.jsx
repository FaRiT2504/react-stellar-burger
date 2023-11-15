import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-tab.module.css'
import PropTypes from "prop-types";

function BurgerTab({ current, handleButtonClick }) {

  return (
    <div className={`${styles.container} mb-5`}>

      <Tab value="bun" active={current === "bun"} onClick={(current) => handleButtonClick(current)}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={(current) => handleButtonClick(current)}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={(current) => handleButtonClick(current)}>
        Начинки
      </Tab>
    </div>
  );
};
BurgerTab.propTypes = {
  current: PropTypes.string,
  handleButtonClick: PropTypes.func
}
export default BurgerTab;