import React, { useEffect, FC } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "../../utils/hooks/useSelector";
import { useDispatch } from "../../utils/hooks/useDispatch";
import styles from './profile-list.module.css';
import ProfileCard from "../../components/profile-card/profile-card";
// import { ingredientsDataSelector } from "../../services/selectors/ingredients-selector";
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws-action'



const ProfileList: FC = () => {
  const dispatch = useDispatch();
  const ordersInfo = useSelector((state) => state.wsReducer.ordersInfo);
  const wsConnected = useSelector(state => state.wsReducer.wsConnected)
  const ingredients = useSelector((state) =>
    state.ingredientsReducer.ingredients);
  // const accessToken = localStorage.getItem('accessToken').split('Bearer ')[1]
  const token = localStorage.getItem('accessToken');
  const accessToken = token?.split('Bearer ')[1]
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
export default ProfileList