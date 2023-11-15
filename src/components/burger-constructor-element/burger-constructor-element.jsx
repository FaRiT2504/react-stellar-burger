import React, { useMemo, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from './burger-constructor-element.module.css'
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDispatch, useSelector } from "react-redux";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useRef } from "react";
import {
  burgerIngredientsSelector
} from "../../services/selectors/ingredients-selector";
import PropTypes from 'prop-types';
import {
  deleteIngredient, moveIngredient
} from "../../services/actions/burger-constructor-action";
import { ingredientType } from "../../utils/types";


function BurgerConstructorElement({ ingredient, index }) {
  const dispatch = useDispatch();
  const elementRef = useRef(null);
  const ingredients = useSelector(burgerIngredientsSelector);

  const moveOrderIngredient = (dragIndex, hoverIndex, ingredients) => {
    dispatch(moveIngredient(dragIndex, hoverIndex, ingredients));
  };

  const [{ handlerId }, drop] = useDrop({
    accept: "orderIngredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
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
      const clientOffset = monitor.getClientOffset();
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
        handleClose={() => { dispatch(deleteIngredient(ingredient._id)) }}

      />
    </div>
  )
}
BurgerConstructorElement.propTypes = {
  index: PropTypes.number,
  ingredient: ingredientType,
};
export default BurgerConstructorElement;