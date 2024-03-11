import React, { FC } from 'react';
import styles from './app-header.module.css'
import { ListIcon, BurgerIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom";

const AppHeader: FC = () => {

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.links}>
          <Link
            to="/"
            className={`${styles.link} pt-4 pr-5 pb-4 pl-5 mt-4 mr-2 mb-4 `}
          >
            <BurgerIcon /*className="mr-2"*/ type="primary" />
            <span className="text text_type_main-default ml-2">
              Конструктор
            </span>
          </Link>
          <Link
            to="/feed"
            className={`${styles.link} pt-4 pr-5 pb-4 pl-5 mt-4 mr-2 mb-4 `}
          >
            <ListIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive ml-2">
              Лента заказов
            </span>
          </Link>
        </div>

        <div className={styles.logo}>
          <Link to="/" >
            <Logo />
          </Link>
        </div>

        <Link to="/profile"
          className={`${styles.link} pt-4 pr-5 pb-4 pl-5 mt-4 mr-2 mb-4 `}
        >
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default text_color_inactive ml-2">
            Личный кабинет
          </span>
        </Link>
      </div>
    </header>
  );
};


export default AppHeader;




