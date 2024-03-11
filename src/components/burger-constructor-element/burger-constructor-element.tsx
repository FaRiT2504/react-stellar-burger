import React, { FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from './burger-constructor-element.module.css'
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "../../utils/hooks/useSelector";
import { useDispatch } from "../../utils/hooks/useDispatch";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
// import {
//   burgerIngredientsSelector
// } from "../../services/selectors/ingredients-selector";
// import PropTypes from 'prop-types';
import {
  deleteIngredientAction, moveIngredientAction
} from "../../services/actions/burger-constructor-action";
// import { ingredientType } from "../../utils/types";
import { TIngredient } from "../../services/types/data";

interface IBurgerConstructorElement {
  ingredient: TIngredient;
  index: number;
}
// export type TDragItem = {
//   index: number;
// };
const BurgerConstructorElement: FC<IBurgerConstructorElement> = ({ ingredient, index }) => {
  const dispatch = useDispatch();
  const elementRef = useRef<HTMLDivElement>(null);
  const ingredients = useSelector((state) => state.burgerConstructorReducer.ingredients);

  const moveOrderIngredient = (dragIndex: number, hoverIndex: number, ingredients: TIngredient[]) => {
    dispatch(moveIngredientAction(dragIndex, hoverIndex, ingredients));
  };

  const [{ handlerId }, drop] = useDrop({
    accept: "orderIngredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: TIngredient & { index: number }, monitor) {
      if (!elementRef.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = elementRef.current?.getBoundingClientRect();
      const hoverCenterY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset()!;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverCenterY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverCenterY) {
        return;
      }
      moveOrderIngredient(dragIndex, hoverIndex, ingredients);
      item.index = index;
    },
  });

  const [_, drag] = useDrag({
    type: "orderIngredient",
    item: { index },
  });

  drag(drop(elementRef));

  return (
    <div className={styles.elements}
      ref={elementRef}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        handleClose={() => { dispatch(deleteIngredientAction(ingredient._id)) }}

      />
    </div>
  )
}
// BurgerConstructorElement.propTypes = {
//   index: PropTypes.number,
//   ingredient: ingredientType,
// };
export default BurgerConstructorElement;