import React, { FC } from "react"
import styles from './status-board.module.css';
// import { useSelector } from "react-redux";
import { useSelector } from "../../utils/hooks/useSelector";


export const StatusBoard: FC = () => {
  const ordersInfo = useSelector((state) => state.wsReducer.ordersInfo);
  const ordersDone = ordersInfo?.orders.filter((order) => order.status === 'done').slice(0, 10);
  const ordersCreate = ordersInfo?.orders.filter((order) => order.status === 'pending').slice(0, 10);



  return (
    ordersInfo
    && ordersDone
    && ordersCreate &&
    <section className={styles.container}>
      <h2 className={`text text_type_main-medium pb-6 ${styles.doneHeading}`}>Готовы:</h2>
      <ul className={`${styles.number} ${styles.done}`}>
        {ordersDone.map((order) => (
          <li key={order._id} className={`text text_type_digits-default`}>{order.number}</li>
        ))}
      </ul>
      <h2 className={`text text_type_main-medium pb-6 ${styles.heading}`}>В работе:</h2>
      <ul className={`${styles.number} ${styles.process}`}>
        {ordersCreate.map((order) => (
          <li key={order._id} className={`text text_type_digits-default`}>{order.number}</li>
        ))}      </ul>
      <h2 className={`text text_type_main-medium pt-15 ${styles.total}`}>Выполнено за все время:</h2>
      <p className={`text text_type_digits-large ${styles.orders}`}>{ordersInfo.total}</p>
      <h2 className={`text text_type_main-medium pt-15 ${styles.total}`}>Выполнено за сегодня:</h2>
      <p className={`text text_type_digits-large ${styles.orders}`}>{ordersInfo.totalToday}</p>
    </section>
  )
}




