import React, { useState } from "react";
import PropTypes from "prop-types";
import BurgerTab from './burger-tab/burger-tab';
import styles from './burger-ingredients.module.css';
import BurgerCard from './burger-card/burger-card';
import BurgerSection from './burger-section/burger-section';
import { useDispatch, useSelector } from "react-redux";
import {
  ingredientsDataSelector
} from "../../services/selectors/ingredients-selector";
import Modal from "../modal/modal";
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import {
  isVisibleModalSelector
} from "../../services/selectors/modal-selector";
import { getIngredients } from "../../services/actions/ingredients-action";
import { setCurrentItem, CLEAR_CURRENT_INGREDIENT } from "../../services/actions/current-ingredient-action";

function BurgerIngredients({ count }) {
  const dispatch = useDispatch();
  const isVisibleModal = useSelector(
    isVisibleModalSelector
  );
  const [current, setCurrent] = React.useState("bun")
  const [modal, setModal] = useState(false);
  const handleButtonClick = (currentTab) => {
    setCurrent(currentTab)
    const element = document.getElementById(currentTab);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const ingredients = useSelector(ingredientsDataSelector);
  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const cardClick = React.useCallback(
    (item) => {
      return () => {
        dispatch(setCurrentItem(item));
        setModal(true);
      };
    },
    []
  );

  const cardClose = () => {
    setModal(false);
    dispatch({
      type: CLEAR_CURRENT_INGREDIENT,
    });
  };

  return (

    <div className={`${styles.container} pt-10`} >
      <h1 className="text text_type_main-large mb-5" >Соберите бургер</h1>
      <BurgerTab current={current} setCurrent={setCurrent} handleButtonClick={handleButtonClick} />
      <div className={`${styles.containerScroll} custom-scroll`}>

        <BurgerSection title={"Булки"} id={"bun"}>
          {ingredients.map(function (item) {
            if (item.type === "bun") {
              return (<BurgerCard key={item._id} onClick={cardClick(item)}
                dataCard={item}
                count={count}
              />)
            }
          })}

        </BurgerSection>

        <BurgerSection title={"Соусы"} id={"sauce"}>
          {ingredients.map(function (item) {
            if (item.type === "sauce") {
              return (<BurgerCard key={item._id} onClick={cardClick(item)}
                dataCard={item}
                count={count}
              />)
            }
          })}
        </BurgerSection>

        <BurgerSection title={"Начинки"} id={"main"}>
          {ingredients.map(function (item) {
            if (item.type === "main") {
              return (<BurgerCard key={item._id} onClick={cardClick(item)}
                dataCard={item}
                count={count}
              />)
            }
          })}
        </BurgerSection >
      </div>
      {
        modal &&
        <Modal
          title="Детали ингредиента"
          isVisible={isVisibleModal}
          onClose={cardClose}
        >
          <IngredientDetails />
        </Modal>

      }
    </div >
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  }),
  cardOnClick: PropTypes.func.isRequired,
  count: PropTypes.number,
};

export default BurgerIngredients;



