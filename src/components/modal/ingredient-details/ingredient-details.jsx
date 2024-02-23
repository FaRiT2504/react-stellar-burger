import { useSelector } from "react-redux";
// import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ingredientType } from "../../../utils/types";
import { ingredientsDataSelector } from "../../../services/selectors/ingredients-selector";
import styles from "./ingredient-details.module.css";
// import { getIngredients } from "../../../services/actions/ingredients-action";
// import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws-action'

export function IngredientDetails() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getIngredients());
  // }, [])
  // const isLoading = useSelector(ingredientsIsLoadingSelector)
  const ingredients = useSelector(ingredientsDataSelector);
  // const ingredients = useSelector((state) => state.ingredientsReducer.ingredients);
  const { ingredientId } = useParams();
  const ingredient = ingredients.find(function (data) {
    return data._id === ingredientId
  });

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

