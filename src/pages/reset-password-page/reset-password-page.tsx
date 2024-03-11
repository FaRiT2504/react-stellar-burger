// import { useSelector } from "react-redux";
import { useSelector } from "../../utils/hooks/useSelector";
import { api } from "../../utils/api";
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password-page.module.css";
import { useForm } from "../../utils/hooks/useForm";
import { FormEvent, FC } from "react"

export const ResetPasswordPage: FC = () => {
  const navigate = useNavigate();
  const [value, onChange] = useForm({ password: '', token: '' });
  const request = useSelector(
    (state) => state.userReducer.userRegisterRequest
  );
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    api.resetPassword(value.password, value.token)
      .then((res) => {
        if (res.success === true) {
          navigate("/");
        }
      })
  }
  if (!request) {
    navigate("/forgot-password");
  }
  return (
    <>
      <h2 className={`${styles.heading}  text text_type_main-medium mb-6`}>
        Восстановление пароля
      </h2>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmit} >
        <PasswordInput
          name="password"
          value={value.password}
          onChange={onChange}
          placeholder="Введите новый пароль"
          disabled={request}
        />
        <Input
          name="token"
          value={value.token}
          onChange={onChange}
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

