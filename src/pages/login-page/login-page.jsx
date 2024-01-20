import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login-page.module.css";
import { login } from "../../services/actions/user-action"

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isChecked = useSelector(
    (state) => state.userReducer.isAuthChecked
  );
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));

  };

  if (isChecked === "true") {
    navigate("/");
  }
  return (
    <>
      <h1 className={`${styles.heading}  text text_type_main-medium mb-6 `}>Вход</h1>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
        <EmailInput
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          placeholder="string"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          size="medium"
          type="primary"
          htmlType="submit"
          disabled={!email || !password}
          children="Войти"
        />
      </form>
      <div className={styles.container}>
        <p className={`${styles.question} text text_type_main-default text_color_inactive`}>
          Вы — новый пользователь? <Link to="/register" className={`${styles.link} text_color_accent`}>Зарегистрироваться</Link>
        </p>
        <p className={`${styles.question} text text_type_main-default text_color_inactive`}>
          Забыли пароль? <Link to="/forgot-password" className={`${styles.link} text_color_accent`}>Восстановить пароль</Link>
        </p>
      </div>
    </>
  )
}
