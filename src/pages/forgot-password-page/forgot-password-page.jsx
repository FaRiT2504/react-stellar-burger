import styles from "./forgot-password-page.module.css";
import {
  Button,
  EmailInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { api } from "../../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "../../utils/hooks/useForm";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { value, onChange } = useForm({ email: "" });
  const onSubmit = (e) => {
    e.preventDefault();
    api.checkEmail(value.email)
      .then((res) => {
        if (res.success === true) {
          navigate(`/reset-password`);
        }
        else {
          navigate(`/forgot-password`);
        }
      });
  };

  return (
    <>
      <h1 className={`${styles.heading}  text text_type_main-medium mb-6`}>Восстановление пароля</h1>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
        <EmailInput
          name="email"
          value={value.email}
          onChange={onChange}
          placeholder="Укажите e-mail" />
        <Button
          size="medium"
          type="primary"
          htmlType="submit"
          disabled={!value.email}
          children="Восстановить" />
      </form>
      <div className={styles.container}>
        <p className={`${styles.question} text text_type_main-default text_color_inactive`}> Вспомнили пароль?;
          <Link to="/login" className={`${styles.link} text_color_accent`} children="Войти" />
        </p>
      </div>
    </>
  );
};
