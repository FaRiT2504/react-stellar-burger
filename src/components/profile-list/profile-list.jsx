import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './profile-list.module.css';
import ProfileCard from "../../components/profile-card/profile-card";
import { ingredientsDataSelector } from "../../services/selectors/ingredients-selector";
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws-action'

export default function ProfileList() {
  const dispatch = useDispatch();
  const ordersInfo = useSelector((state) => state.wsReducer.ordersInfo);
  const wsConnected = useSelector(state => state.wsReducer.wsConnected)
  const ingredients = useSelector(ingredientsDataSelector);

  // const location = useLocation();
  const accessToken = localStorage.getItem('accessToken').split('Bearer ')[1];
  // const accessToken = localStorage.getItem('accessToken');
  const url = 'wss://norma.nomoreparties.space/orders'

  useEffect(() => {
    dispatch(wsConnectionStart(url + '?token=' + accessToken));
  }, [])

  useEffect(() => {
    return () => {
      dispatch(wsConnectionClosed());
    }
  }, [])


  if (!ordersInfo) {
    return null
  }

  return (ordersInfo &&
    <section className={`${styles.container} custom-scroll`}>
      <ul className={styles.list}>
        <li>
          {ordersInfo.orders.map((order) => (

            <ProfileCard key={order.number} order={order} ingredients={ingredients} />

          )
          )
          }
        </li>
      </ul>
    </section>

  )
}