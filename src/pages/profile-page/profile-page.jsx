import { NavLink, Outlet } from "react-router-dom";
import styles from "./profile-page.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../services/actions/user-action"

export const ProfilePage = () => {
  const dispatch = useDispatch();
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
      <Outlet />
    </div >
  );
};

