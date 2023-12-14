import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-page.module.css";
import { api } from "../../utils/api";
import { useDispatch } from "react-redux";
import { logout } from "../../services/actions/user-action"
export const ProfilePage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onClick = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <NavLink
          to="/profile"
          className={(({ isActive }) => isActive ? `${styles.linkActive} text text_type_main-medium` : `${styles.linkInactive} text text_type_main-medium text_color_inactive`)}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={(({ isActive }) => isActive ? `${styles.linkActive} text text_type_main-medium` : `${styles.linkInactive} text text_type_main-medium text_color_inactive`)}
        >
          История заказов
        </NavLink>
        <NavLink
          to="/login"
          onClick={onClick}
          className={(({ isActive }) => isActive ? `${styles.linkActive} text text_type_main-medium` : `${styles.linkInactive} text text_type_main-medium text_color_inactive`)} >
          <p className="text text_type_main-medium">Выход</p>
        </NavLink>
        <p className={`${styles.description} text text_type_main-small`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <form className={`${styles.form} mb-20`} >
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <EmailInput
          type="email"
          placeholder="E-mail"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          placeholder="Пароль"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>

    </div>
  );
};

