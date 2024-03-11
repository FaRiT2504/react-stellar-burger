import React, { FC } from 'react';
import styles from './order-details.module.css';
import iconOrder from "../../../images/iconOrder.svg";
// import PropTypes from "prop-types";

interface IOrderDetails {
  number: number | null
  name: string | null
}


const OrderDetails: FC<IOrderDetails> = ({ number, name }) => {
  return (
    <div className={`${styles.container} pt-4 pb-30`}>
      <h3 className="text text_type_digits-large pb-4">{number}</h3>
      <p className="text text_type_main-medium">{name}</p>
      <img src={iconOrder} alt="Иконка для готового заказа" className="pt-15 pb-15"></img>
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive pt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
// OrderDetails.propTypes = {
//   number: PropTypes.number,
//   name: PropTypes.string
// }
export default OrderDetails