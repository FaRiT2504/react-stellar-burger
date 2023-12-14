import React from 'react';
import styles from './app-header.module.css'
import { ListIcon, BurgerIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom";

function AppHeader() {

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <nav className={styles.links}>
          <a
            href="."
            className={`${styles.link} pt-4 pr-5 pb-4 pl-5 mt-4 mr-2 mb-4 `}
          >
            <BurgerIcon className="mr-2" type="primary" />
            <span className="text text_type_main-default ml-2">
              Конструктор
            </span>
          </a>
          <a
            href="."
            className={`${styles.link} pt-4 pr-5 pb-4 pl-5 mt-4 mr-2 mb-4 `}
          >
            <ListIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive ml-2">
              Лента заказов
            </span>
          </a>
        </nav>

        <div className={styles.logo}>
          <Link to="/" >
            <Logo />
          </Link>
        </div>

        <a
          href="."
          className={`${styles.link} pt-4 pr-5 pb-4 pl-5 mt-4 mr-2 mb-4 `}
        >
          <ProfileIcon type="secondary" />
          <Link to="/profile" >
            <span className="text text_type_main-default text_color_inactive ml-2">
              Личный кабинет
            </span>
          </Link>
        </a>
      </div>
    </header>
  );
};


export default AppHeader;




