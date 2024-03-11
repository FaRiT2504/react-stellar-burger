import { Button, Input, EmailInput, PasswordInput, } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../../utils/hooks/useForm';
// import { useSelector } from 'react-redux';
import { useSelector } from "../../utils/hooks/useSelector";
import { api } from '../../utils/api';
import styles from "./profile.module.css";
import { FormEvent, FC } from "react"

const Profile: FC = () => {
  const name = useSelector(
    (state) => state.userReducer.user?.name as string
  );
  const email = useSelector(
    (state) => state.userReducer.user?.email as string
  );
  // const user = useSelector((state) => state.userReducer.user.email );
  const [values, onChange, setValues] = useForm({ /*name: name, email: email, password: '******' */ });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    api.userRefresh(values.name, values.email)
  };
  const onClick = () => {
    setValues({
      name: name, email: email, password: '******'
    });
  }

  return (
    <form className={`${styles.form} mb-20`} onSubmit={onSubmit} >
      <Input
        type="text"
        placeholder="Имя"
        name={"name"}
        value={values.name}
        onChange={onChange}
      />
      <EmailInput
        // type="email"
        placeholder="E-mail"
        name={"email"}
        value={values.email}
        onChange={onChange}
      />
      <PasswordInput
        extraClass="mb-2"
        placeholder="string"
        name="password"
        value={values.password}
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

export default Profile