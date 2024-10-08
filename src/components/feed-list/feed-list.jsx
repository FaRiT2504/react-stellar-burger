import { useSelector } from "react-redux";
import styles from './feed-list.module.css';
import FeedCard from "../feed-card/feed-card";
import { ingredientsDataSelector } from "../../services/selectors/ingredients-selector";

export default function FeedList() {
  const ordersInfo = useSelector((state) => state.wsReducer.ordersInfo);

  const ingredients = useSelector(ingredientsDataSelector);
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









