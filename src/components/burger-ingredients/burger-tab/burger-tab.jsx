import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-tab.module.css'
function BurgerTab({ current, handleButtonClick }) {

  return (
    <div className={`${styles.container} mb-5`}>

      <Tab value="bun" active={current === "bun"} onClick={(currentTab) => handleButtonClick(currentTab)}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={(currentTab) => handleButtonClick(currentTab)}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={(currentTab) => handleButtonClick(currentTab)}>
        Начинки
      </Tab>
    </div>
  );
};
export default BurgerTab;