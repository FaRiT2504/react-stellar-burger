import { useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../utils/api";
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password-page.module.css";

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [NewPassword, setNewPassword] = useState(null);
  const request = useSelector(
    (state) => state.userReducer.userRegisterRequest
  );
  const onSubmit = (e) => {
    e.preventDefault();
    api.resetPassword(NewPassword, token)
      .then((res) => {
        if (res.success === true) {
          navigate("/");
        }
      })
  }

  return (
    <>
      <h2 className={`${styles.heading}  text text_type_main-medium mb-6`}>
        Восстановление пароля
      </h2>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmit} >
        <PasswordInput
          name="password"
          value={NewPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Введите новый пароль"
          disabled={request}
        />
        <Input
          name="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Введите код из письма"
          disabled={request}
        />
        <Button
          htmlType="submit"
          size="large"
          type="primary"
          disabled={request}
        >
          Восстановить
        </Button>
      </form>
      <p className={`${styles.question} text text_type_main-default text_color_inactive`}>
        <Link className={`${styles.link} text_color_accent`} to="/login">
          Войти
        </Link>
      </p>
    </>
  );
};
