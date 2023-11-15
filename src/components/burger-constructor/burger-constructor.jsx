import React, { useMemo, useState } from "react";
import styles from './burger-constructor.module.css'
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from "react-redux";
import {
  bunSelector,
  burgerIngredientsSelector
} from "../../services/selectors/ingredients-selector";
import { openModalAction } from "../../services/actions/modal-action";
import { makeOrder } from "../../services/actions/order-actions";
import Modal from "../modal/modal";
import {
  orderErrorSelector,
  orderLoadingSelector,
  orderNameSelector,
  orderNumberSelector,
} from "../../services/selectors/order-selector";
import OrderDetails from '../modal/order-details/order-details';
import { CLEAR_CONSTRUCTOR, addIngredients, addBun } from "../../services/actions/burger-constructor-action";
import { useDrop } from "react-dnd";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import { useCallback } from "react";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const bun = useSelector(bunSelector);
  const noBun = useSelector(burgerIngredientsSelector);
  const orderIsLoading = useSelector(orderLoadingSelector);
  const orderError = useSelector(orderErrorSelector);
  const orderName = useSelector(orderNameSelector);
  const orderNumber = useSelector(orderNumberSelector);
  const [modalOpen, setModalOpen] = useState(false);

  React.useEffect(() => {
    if (orderName && orderNumber) {
      dispatch({
        type: CLEAR_CONSTRUCTOR,
      });
      openModalAction("order");
    }
  }, [orderName, orderNumber, openModalAction]);


  const totalPrice = React.useMemo(
    () => {
      let total = bun ? bun.price * 2 : 0;

      return noBun.reduce(
        (previousValue, item) => previousValue + item.ingredient.price, total
      );
    },
    [bun, noBun]
  );


  const orderClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      ingredient.type === "bun"
        ? dispatch(addBun(ingredient))
        : dispatch(addIngredients(ingredient));
    },
  });

  const getIngredientsId = (bun, noBun) => {
    const noBunId = noBun.map((item) => item.ingredient._id);
    const bunId = bun._id;
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
            noBun.map((item, index) => {
              return (<BurgerConstructorElement
                key={item.key}
                index={index}
                ingredient={item.ingredient}
                id={item.ingredient._id}
                elseProducts={noBun}
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
            <CurrencyIcon />
          </p>
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={orderOnClick}
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




