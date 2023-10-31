import styles from './burger-card.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';


function BurgerCard({ dataCard, onClick, count }) {
  return (
    <div className={styles.container}>
      <div className={styles.content} onClick={onClick}>
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
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};

export default BurgerCard