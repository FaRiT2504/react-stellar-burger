
import PropTypes from 'prop-types';
import { useLocation, Link } from "react-router-dom";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { ingredientType } from "../../../utils/types";
import styles from './burger-card.module.css';

function BurgerCard({ dataCard, onClick, count }) {
  const location = useLocation();

  const ingredientId = dataCard['_id'];

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: dataCard,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (

    <Link
      key={ingredientId}
      // Тут мы формируем динамический путь для нашего ингредиента
      to={`/ingredients/${ingredientId}`}
      // а также сохраняем в свойство background роут,
      // на котором была открыта наша модалка
      state={{ background: location }}
      className={styles.link}
    >
      <div className={styles.container} ref={dragRef}>
        <div className={styles.content} onClick={onClick} >
          <img src={dataCard.image} alt={dataCard.name} className="pr-4 pl-4" />
          <div className={`${styles.price} pt-1 pb-2 `}>
            <p className="text text_type_digits-medium pr-2">{dataCard.price}</p>
            <CurrencyIcon />
          </div>
          <p className={`text text_type_main-default ${styles.name}`}>{dataCard.name}</p>
          {count >= 1 &&
            <Counter count={count} size="default" extraClass="m-1" />
          }
        </div>
      </div>
    </Link>

  )
}

BurgerCard.propTypes = {
  dataCard: ingredientType,
  onClick: PropTypes.func,
  count: PropTypes.number
};

export default BurgerCard