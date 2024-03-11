// import { useDispatch, useSelector } from "react-redux";
import { useMemo, FC } from "react";
import styles from './feed-card.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { quantityOfIngredients } from '../../utils/data'
import { TIngredient, TOrder } from '../../services/types/data'
interface IFeedCard {
  order: TOrder
  ingredients: ReadonlyArray<TIngredient> | null
}

const FeedCard: FC<IFeedCard> = ({ order, ingredients }) => {
  const location = useLocation()
  const orderIngredients = useMemo(() =>
    order?.ingredients.map((ingredientId) =>
      ingredients?.find((ingredient) =>
        ingredientId === ingredient._id
      ))
    , [order?.ingredients, ingredients]);

  // const ingredientsPart = orderIngredients?.slice(6).length;
  const ingredientsPart = orderIngredients?.length - quantityOfIngredients;
  const totalPrice = ingredients?.reduce((previousValue, item) => {
    return previousValue + item.price
  }, 0)

  const number = order.number

  return (
    <>
      <Link
        to={`/feed/${number}`}
        state={{ background: location }}
        className={`pl-6 pr-6 pb-6 pt-6 ${styles.link}`}>

        <div className={styles.heading}>
          <p className='text text_type_digits-default'>{`#${order.number}`}</p>
          <p className='text text_type_main-default text_color_inactive'>
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
        </div>
        <h2 className={`text text_type_main-medium ${styles.title}`}>{order.name}</h2>
        <div className={styles.details}>
          <div className={styles.photos}>
            {orderIngredients.slice(0, 6).map((ingredient, index) => {
              return (
                <div className={styles.cardInfo} key={uuidv4()}>
                  <img alt={ingredient?.name} src={ingredient?.image} className={styles.picture} />
                  {index === 5 && ingredientsPart !== 0 && (<div className={styles.counter}><p className="text text_type_digits-default">{`+${ingredientsPart}`}</p></div>
                  )}
                </div>
              )
            })}
          </div>
          <p className={`text text_type_digits-default ${styles.price}`}>
            {totalPrice} <CurrencyIcon type="primary" />
          </p>
        </div>
      </Link>
    </>
  )
}

export default FeedCard