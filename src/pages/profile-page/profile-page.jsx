import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-page.module.css";
import { api } from "../../utils/api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../services/actions/user-action"
import { checkUserAuth, setUser, setAuthChecked } from "../../services/actions/user-action";
import { login } from "../../services/actions/user-action"

export const ProfilePage = () => {

  const dispatch = useDispatch();
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const name = useSelector(
    (state) => state.userReducer.user.name
  );
  const email = useSelector(
    (state) => state.userReducer.user.email
  );
  // const password = useSelector(
  //   (state) => state.userReducer.userRegisterRequest
  // );
  const onClick = (e) => {
    e.preventDefault();
    dispatch(logout());
  }
  const onSubmit = (e) => {
    e.preventDefault();
    // dispatch(login(email, password));
  };





  // const isAuthChecked = useSelector((store) => store.userReducer.isAuthChecked);
  // const user = useSelector(
  //   (state) => state.userReducer.user
  // );
  // useEffect(() => {

  //   dispatch(checkUserAuth());
  //   dispatch(setUser(isAuthChecked));
  //   dispatch(setAuthChecked(user));
  // }, []);






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

      <form className={`${styles.form} mb-20`} onSubmit={onSubmit} >
        <Input
          type="text"
          placeholder="Имя"
          name={"name"}
          value={name}
          onChange={(e) => setNewName(e.target.value)}
        // name={1}

        // onChange={1}
        />
        <EmailInput
          type="email"
          placeholder="E-mail"
          name={"email"}
          value={email}
          onChange={(e) => setNewEmail(e.target.value)}
        // name={1}
        // value={1}
        // onChange={1}
        />
        <PasswordInput
          extraClass="mb-2"
          placeholder="string"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        // name={1}
        // value={1}
        // onChange={1}
        />
      </form>

    </div >
  );
};

