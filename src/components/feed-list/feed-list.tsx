import React, { FC } from "react";
import { useSelector } from "../../utils/hooks/useSelector";
// import { useDispatch } from "../../utils/hooks/useDispatch";
import styles from './feed-list.module.css';
import FeedCard from "../feed-card/feed-card";
// import { ingredientsDataSelector } from "../../services/selectors/ingredients-selector";

const FeedList: FC = () => {
  const ordersInfo = useSelector((state) => state.wsReducer.ordersInfo);

  const ingredients = useSelector((state) =>
    state.ingredientsReducer.ingredients);
  return (ordersInfo &&
    <div className={`${styles.container} custom-scroll`}>
      <ul className={styles.list}>
        <li>
          {ordersInfo.orders.map((order) => (
            <FeedCard key={order.number} order={order} ingredients={ingredients} />
          ))}
        </li>
      </ul>
    </div>
  )
}

export default FeedList









