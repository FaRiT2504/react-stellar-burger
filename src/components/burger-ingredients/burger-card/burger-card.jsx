import styles from './burger-card.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { ingredientType } from "../../../utils/types";

function BurgerCard({ dataCard, onClick, count }) {
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: dataCard,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  return (
    <div className={styles.container} ref={dragRef}>
      <div className={styles.content} onClick={onClick} >
        <img src={dataCard.image} alt={dataCard.name} className="pr-4 pl-4" />
        <div className={`${styles.price} pb-2 pt-1`}>
          <p className="text text_type_digits-medium pr-2">{dataCard.price}</p>
          <CurrencyIcon />
        </div>
        <p className={`text text_type_main-default ${styles.name}`}>{dataCard.name}</p>
        {count >= 1 &&
          <Counter count={count} size="default" extraClass="m-1" />
        }
      </div>
    </div>
  )
}

BurgerCard.propTypes = {
  dataCard: ingredientType,
  onClick: PropTypes.func,
  count: PropTypes.number
};

export default BurgerCard