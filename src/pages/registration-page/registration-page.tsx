import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { useSelector } from "../../utils/hooks/useSelector";
import { useDispatch } from "../../utils/hooks/useDispatch";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./registration-page.module.css";
import { registrationAction } from "../../services/actions/user-action";
import { useForm } from "../../utils/hooks/useForm";
import { FormEvent, FC } from "react"

export const RegisterPage: FC = () => {
  const { values, onChange } = useForm({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const request = useSelector(
    (state) => state.userReducer.userRegisterRequest
  );
  const isChecked = useSelector(
    (state) => state.userReducer.isAuthChecked
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(registrationAction(values.name, values.email, values.password));
    if (isChecked === true) {
      navigate("/login");
    }
  };

  return (
    <>
      <h1 className={`${styles.heading}  text text_type_main-medium mb-6`}>
        Регистрация
      </h1>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          value={values.name}
          onChange={onChange}
          disabled={request}
        />
        <EmailInput
          // type="email"
          name="email"
          value={values.email}
          onChange={onChange}
          disabled={request}
        />
        <PasswordInput
          // type="text"
          name="password"
          value={values.password}
          onChange={onChange}
          disabled={request}
        />
        <Button
          size="medium"
          type="primary"
          htmlType="submit"
          disabled={request}
          children="Зарегистрироваться"
        />
      </form>
      <div className={styles.container}>
        <p className={`${styles.question} text text_type_main-default text_color_inactive`}>
          Уже зарегистрированы?;
          <Link
            to="/login"
            className={`${styles.link} text_color_accent`}
            children="Войти"
          />
        </p>
      </div>
    </>
  );
};

