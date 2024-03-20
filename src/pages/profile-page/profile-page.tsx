import { NavLink, Outlet } from "react-router-dom";
import { useEffect } from 'react'
import styles from "./profile-page.module.css";

import { logout } from "../../services/actions/user-action"
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws-action'
// import { useDispatch, useSelector } from 'react-redux'
import { useDispatch } from "../../utils/hooks/useDispatch";
import { FormEvent, FC } from "react"

export const ProfilePage: FC = () => {
  const dispatch = useDispatch();
  const onClick = (e: FormEvent) => {
    e.preventDefault();
    dispatch(logout());
  }

  // const url = 'wss://norma.nomoreparties.space/orders/all'

  // useEffect(() => {
  //   dispatch(wsConnectionStart(url))

  //   return () => {
  //     dispatch(wsConnectionClosed())
  //   }
  // }, [])
  // const ordersInfo = useSelector(state => state.wsReducer.ordersInfo)
  // const wsConnected = useSelector(state => state.wsReducer.wsConnected)


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

