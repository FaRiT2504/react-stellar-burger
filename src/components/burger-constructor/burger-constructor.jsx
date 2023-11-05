import React, { useMemo } from "react";
import styles from './burger-constructor.module.css'
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from "react-redux";
import {
  ingredientsDataSelector,
  ingredientsErrorSelector,
  ingredientsIsLoadingSelector,
} from "../../services/selectors/ingredients-selector";
function BurgerConstructor({ /*data,*/ orderOnClick }) {
  const dispatch = useDispatch();
  const ingredients = useSelector(ingredientsDataSelector);
  const bun = ingredients.find(
    item => item.type === "bun"
  )

  const noBun = ingredients.filter(
    item => item.type !== "bun"
  )

  const totalPrice = React.useMemo(
    () => {
      let total = bun ? bun.price * 2 : 0;
      if (noBun.length) {
        return noBun.reduce(
          (previousValue, item) => previousValue + item.price, total
        );
      };
      return total
    },
    [bun, noBun]
  );

  // function totalPrice() {
  //   const total = bun ? bun.price * 2 : 0;
  //   if (noBun.length) {
  //     return noBun.reduce(
  //       (previousValue, item) => previousValue + item.price, total
  //     );
  //   };
  //   return total;
  // };

  return (
    <div className={`${styles.container} ml-20 pl-4 pr-4 `}>
      <div className={styles.ingredients}>
        <div className={styles.bun}>
          {bun && (<ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />)
          }
        </div>

        <div className={`${styles.scroll} custom-scroll pr-2`}>
          {
            noBun.map((item) => {
              return (
                <div className={styles.elements} key={item.id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image_mobile}
                  />
                </div>
              )
            })
          }
        </div>

        <div className={styles.bun}>
          {bun && (<ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name}
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
            {/* {totalPrice()} */}
            <CurrencyIcon />
          </p>

        </div>

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={orderOnClick}
        >
          Оформить заказ
        </Button>
      </div>

    </div >
  )
}

export default BurgerConstructor;
