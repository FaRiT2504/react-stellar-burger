// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "../../utils/hooks/useSelector";
import { useDispatch } from "../../utils/hooks/useDispatch";
import { useNavigate, Link } from "react-router-dom";
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login-page.module.css";
import { login } from "../../services/actions/user-action"
import { useForm } from "../../utils/hooks/useForm";
import { FormEvent, FC } from "react"

export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const [value, onChange] = useForm({ email: "", password: "" });
  const navigate = useNavigate();
  const isChecked = useSelector(
    (state) => state.userReducer.isAuthChecked
  );
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login(value.email, value.password));
  };

  if (isChecked === true) {
    navigate("/");
  }
  return (
    <>
      <h1 className={`${styles.heading}  text text_type_main-medium mb-6 `}>Вход</h1>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
        <EmailInput
          // type="email"
          name="email"
          value={value.email}
          onChange={onChange}
        />
        <PasswordInput
          placeholder="string"
          name="password"
          value={value.password}
          onChange={onChange}
        />
        <Button
          size="medium"
          type="primary"
          htmlType="submit"
          disabled={!value.email || !value.password}
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
