
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import styles from "./order.module.css";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// import { getIngredients } from "../../services/actions/ingredients-action";
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws-action';
import { ingredientsDataSelector, orderSelector } from "../../services/selectors/ingredients-selector";
// import { checkUserAuth, getUserData } from "../../services/actions/user-action";
import { getFeedOrder, getProfileOrder } from "../../services/actions/order-number";

export default function Order() {
  const dispatch = useDispatch()

  // const ordersInfo = useSelector(orderSelector);
  const { number } = useParams();
  const ingredients = useSelector(ingredientsDataSelector);
  const ordersInfo = useSelector((state) => state.orderNumberReducer.data);
  const location = useLocation()

  React.useEffect(() => {
    if (location.pathname.includes('feed')) {
      dispatch(getFeedOrder(number))
    }
    else {
      dispatch(getProfileOrder(number))
    }
  }, [])

  const order = ordersInfo ? ordersInfo.orders[0] : null
  const orderIngredients = React.useMemo(() =>
    order?.ingredients.map((ingredientId) =>
      ingredients?.find((ingredient) =>
        ingredientId === ingredient._id
      ))
    , [order?.ingredients, ingredients]);


  const counter = (ingredient) => {
    let result = orderIngredients?.filter((item) => item._id === ingredient._id);
    return result.length
  }
  const totalPrice = ingredients.reduce((previousValue, item) => {
    return previousValue + item.price
  }, 0)

  if (!ordersInfo) {
    return (
      <>
        <p>Is loading</p>
      </>
    )
  }
  return (

    (ingredients && ordersInfo &&
      <>
        < div className={`pl-10 pr-10 pb-10 pt-10 ${styles.container}`
        }>
          <div className={styles.header}>
            <p className={`${styles.number} text text_type_digits-default`}>{`#${order?.number}`}</p>
          </div>
          <div className={styles.status}>
            <h1 className="text text_type_main-medium">{order.name}</h1>
            <p className={`text text_type_main-default ${order.status === 'done' ? styles.done : ''}`}>
              {
                order.status === 'done' ? 'Выполнен'
                  : order.status === 'creates' ? 'Готовится'
                    : 'Создается'
              }
            </p>
          </div>
          <div className={styles.order}>
            <p className="text text_type_main-medium">Состав: </p>
            <ul className={`custom-scroll ${styles.ingredients}`}>
              {
                orderIngredients.map((item, index) => {
                  return <li className={styles.ingredient} key={index} >
                    <img src={item.image_mobile} className={styles.image} alt="Ингредиент" />
                    <p className={`text text_type_main-default ${styles.name}`}>{item.name}</p>
                    <p className={`text text_type_digits-default ${styles.price}`}>
                      {counter[item]} X {item.price} <CurrencyIcon />
                    </p>
                  </li>
                })
              }
            </ul>
          </div>
          <div className={styles.footer}>
            <p className='text text_type_main-default text_color_inactive'>
              <FormattedDate date={new Date(order.createdAt)} />
            </p>
            <p className={`text text_type_digits-default ${styles.price}`}>
              {totalPrice} <CurrencyIcon type="primary" />
            </p>
          </div>
        </div >
      </>
    ))
}

