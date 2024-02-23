import { useSelector } from "react-redux";
import styles from './profile-list.module.css';
import ProfileCard from "../../components/profile-card/profile-card";
import { ingredientsDataSelector } from "../../services/selectors/ingredients-selector";

export default function ProfileList() {
  const ordersInfo = useSelector((state) => state.wsReducer.ordersInfo);
  const wsConnected = useSelector(state => state.wsReducer.wsConnected)
  const ingredients = useSelector(ingredientsDataSelector);

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