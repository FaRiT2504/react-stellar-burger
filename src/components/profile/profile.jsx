import { Button, Input, EmailInput, PasswordInput, } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../../utils/hooks/useForm';
import { useSelector } from 'react-redux';
import { api } from '../../utils/api';
import styles from "./profile.module.css";

export default function Profile() {
  const name = useSelector(
    (state) => state.userReducer.user.name
  );
  const email = useSelector(
    (state) => state.userReducer.user.email
  );
  const { value, onChange, setValue } = useForm({ name: name, email: email, password: '******' });

  const onSubmit = (e) => {
    e.preventDefault();
    api.userRefresh(value.name, value.email)
  };
  const onClick = (e) => {
    setValue({
      name: name, email: email, password: '******'
    });
  }

  return (
    <form className={`${styles.form} mb-20`} onSubmit={onSubmit} >
      <Input
        type="text"
        placeholder="Имя"
        name={"name"}
        value={value.name}
        onChange={onChange}
      />
      <EmailInput
        type="email"
        placeholder="E-mail"
        name={"email"}
        value={value.email}
        onChange={onChange}
      />
      <PasswordInput
        extraClass="mb-2"
        placeholder="string"
        name="password"
        value={value.password}
        onChange={onChange}
      />
      <div className={styles.buttons}>
        <Button
          type="secondary"
          size="medium"
          htmlType="submit"
          onClick={onClick}
        >
          Отмена
        </Button>
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
        >
          Сохранить
        </Button>
      </div>
    </form>
  )
}