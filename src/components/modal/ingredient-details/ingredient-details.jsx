import PropTypes from "prop-types";
import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  currentIngredientSelector
} from "../../../services/selectors/current-ingredient-selector";
import { ingredientType } from "../../../utils/types";


import { ingredientsDataSelector } from "../../../services/selectors/ingredients-selector";

import { SET_CURRENT_INGREDIENT } from "../../../services/actions/current-ingredient-action";
import { getIngredients } from "../../../services/actions/ingredients-action";
import styles from "./ingredient-details.module.css";


export function IngredientDetails() {
  // const dispatch = useDispatch();



  const ingredients = useSelector(ingredientsDataSelector);
  const { ingredientId } = useParams();
  const ingredient = ingredients.find(function (data) {
    return data._id === ingredientId
  });

  // const ingredient = useSelector(currentIngredientSelector);

  // useEffect(() => {
  //   // dispatch(getIngredients());
  //   dispatch({
  //     type: SET_CURRENT_INGREDIENT,
  //     payload: ingredients.find((ingredient) => ingredient._id === _id),
  //   });
  // }, [dispatch, ingredients, ingredient, _id]);
  // const ingredient = useSelector(currentIngredientSelector);

  return (
    <div className={`${styles.container} pb-10 pb-15`}>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className={`${styles.name} text text_type_main-medium mt-4`}>
        {ingredient.name}
      </p>
      <div className={`${styles.information} mt-8`}>
        <div className={styles.nutritional}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.calories}
          </p>
        </div>
        <div className={styles.nutritional}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </div>
        <div className={styles.nutritional}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.fat}
          </p>
        </div>
        <div className={styles.nutritional}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientType
}
export default IngredientDetails;

