import React, { useState, FC } from "react";
import { v4 as uuid } from "uuid";
import styles from './burger-constructor.module.css'
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from "../../utils/hooks/useSelector";
import { useDispatch } from "../../utils/hooks/useDispatch";
// import {
//   bunSelector,
//   burgerIngredientsSelector
// } from "../../services/selectors/ingredients-selector";
import { openModalAction } from "../../services/actions/modal-action";
import { makeOrder } from "../../services/actions/order-action";
import Modal from "../modal/modal";
// import {
//   orderErrorSelector,
//   orderLoadingSelector,
//   orderNameSelector,
//   orderNumberSelector,
// } from "../../services/selectors/order-selector";
import OrderDetails from '../modal/order-details/order-details';
import { clearConstructorAction, addIngredientsAction, addBunAction } from "../../services/actions/burger-constructor-action";
import { useDrop } from "react-dnd";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TIngredient } from "../../services/types/data";
import { IBurgerConstructorIngredient } from "../../services/reducers/burger-constructor-reducer"

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const bun = useSelector((state) => state.burgerConstructorReducer.bun);
  const noBun = useSelector((state) => state.burgerConstructorReducer.ingredients);
  const orderIsLoading = useSelector((state) => state.orderReducer.isLoading);
  const orderError = useSelector((state) => state.orderReducer.error);
  const orderName = useSelector((state) => state.orderReducer.name);
  const orderNumber = useSelector((state) => state.orderReducer.number);
  const [modalOpen, setModalOpen] = useState(false);
  const user = useSelector(store => store.userReducer.user);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (orderName && orderNumber) {
      dispatch(clearConstructorAction);
      openModalAction("order");
    }
  }, [orderName, orderNumber, openModalAction]);


  const totalPrice = React.useMemo(
    () => {
      let total = bun ? bun.price * 2 : 0;

      return noBun?.reduce(
        (previousValue: number, item: IBurgerConstructorIngredient) => previousValue + item.ingredient.price, total
      );
    },
    [bun, noBun]
  );


  const orderClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient: TIngredient) {
      ingredient.type === "bun"
        ? dispatch(addBunAction(ingredient))
        : dispatch(addIngredientsAction(ingredient));
    },
  });

  const getIngredientsId = (bun: TIngredient | null, noBun: IBurgerConstructorIngredient[] | null) => {
    const noBunId = noBun?.map((item) => item.ingredient._id) as string[];
    const bunId = bun?._id;
    return [bunId, ...noBunId, bunId];
  };


  const orderOnClick = () => {
    dispatch(openModalAction("order"));
    const IngredientId = getIngredientsId(bun, noBun);
    dispatch(makeOrder(IngredientId));
    setModalOpen(true);
  };

  if (orderError) {
    return <p className="text text_type_main-large">{orderError}</p>;
  }

  return (
    <div className={`${styles.container} ml-20 pl-4 pr-4 `} ref={dropTarget}>
      <div className={styles.ingredients}>
        <div className={styles.bun}>
          {bun && (<ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />)
          }
        </div>

        <div className={`${styles.scroll} custom-scroll pr-2`}>
          {
            noBun?.map((item: IBurgerConstructorIngredient, index: number) => {
              return (<BurgerConstructorElement
                key={item.key}
                index={index}
                ingredient={item}
              // id={item._id}
              // elseProducts={noBun}
              />)
            })
          }
        </div>

        <div className={styles.bun}>
          {bun && (<ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />)
          }
        </div>
      </div >

      <div className={styles.box}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium pr-2">
            {totalPrice}
            <CurrencyIcon type="primary" />
          </p>
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={
            () => {
              if (user) { orderOnClick() }
              else { navigate(`/login`); }
            }
          }
        >
          {orderIsLoading ? "Оформление..." : "Оформить заказ"}
        </Button>
      </div>
      {
        modalOpen && (
          <Modal onClose={orderClose}>
            <OrderDetails name={orderName} number={orderNumber} />
          </Modal>
        )
      }
    </div >
  )
}

export default BurgerConstructor;




