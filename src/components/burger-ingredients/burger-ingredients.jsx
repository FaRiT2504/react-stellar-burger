import React, { useState, useEffect, useCallback } from "react";
import BurgerTab from './burger-tab/burger-tab';
import styles from './burger-ingredients.module.css';
import BurgerCard from './burger-card/burger-card';
import BurgerSection from './burger-section/burger-section';
import { useDispatch, useSelector } from "react-redux";
import {
  ingredientsDataSelector, burgerIngredientsSelector, bunSelector
} from "../../services/selectors/ingredients-selector";
import Modal from "../modal/modal";
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import {
  isVisibleModalSelector
} from "../../services/selectors/modal-selector";
import { setCurrentItem, CLEAR_CURRENT_INGREDIENT } from "../../services/actions/current-ingredient-action";
import { useInView } from "react-intersection-observer";

function BurgerIngredients() {
  const dispatch = useDispatch();
  const isVisibleModal = useSelector(
    isVisibleModalSelector
  );
  const [currentTab, setCurrentTab] = React.useState("bun")
  const [modal, setModal] = useState(false);

  const chosenBun = useSelector(bunSelector)
  const chosenIngredients = useSelector(burgerIngredientsSelector)

  const [bunRef, viewBun] = useInView({ threshold: 0 });
  const [sauceRef, viewSauce] = useInView({ threshold: 0 });
  const [mainRef, viewMain] = useInView({ threshold: 0 });

  const handleButtonClick = (Tab) => {
    setCurrentTab(Tab)
    const element = document.getElementById(Tab);
    if (element) {
      element.scrollIntoView({ block: "start", behavior: "smooth" })
    }
  }


  React.useEffect(() => {
    if (viewBun) {
      handleButtonClick("bun");
    } else if (viewSauce) {
      handleButtonClick("sauce");
    } else if (viewMain) {
      handleButtonClick("main");
    }
  }, [viewBun, viewSauce, viewMain]);

  const ingredients = useSelector(ingredientsDataSelector);

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

  const totalCount = useCallback((item) => {
    if (chosenBun && item.type === "bun") {
      return chosenBun._id === item._id ? 2 : 0
    } else {
      return chosenIngredients.filter(ingred => ingred.ingredient._id === item._id).length
    }
  }, [chosenIngredients, chosenBun]
  )


  return (

    <div className={`${styles.container} pt-10`} >
      <h1 className="text text_type_main-large mb-5" >Соберите бургер</h1>
      <BurgerTab current={currentTab} handleButtonClick={handleButtonClick} />
      <div className={`${styles.containerScroll} custom-scroll`}>

        <div ref={bunRef}>
          <BurgerSection title={"Булки"} id={"bun"}>
            {ingredients.map(function (item) {
              if (item.type === "bun") {
                return (<BurgerCard key={item._id} onClick={cardClick(item)}
                  dataCard={item}
                  count={chosenBun !== null ? totalCount(item) : 0}
                />)
              }
            })}
          </BurgerSection>
        </div>

        <div ref={sauceRef} >
          <BurgerSection title={"Соусы"} id={"sauce"}>
            {ingredients.map(function (item) {
              if (item.type === "sauce") {
                return (<BurgerCard key={item._id} onClick={cardClick(item)}
                  dataCard={item}
                  count={chosenIngredients.length !== 0 ? totalCount(item) : 0}
                />)
              }
            })}
          </BurgerSection>
        </div>

        <div ref={mainRef}>
          <BurgerSection title={"Начинки"} id={"main"}>
            {ingredients.map(function (item) {
              if (item.type === "main") {
                return (<BurgerCard key={item._id} onClick={cardClick(item)}
                  dataCard={item}
                  count={chosenBun === null ? 0 : totalCount(item)}
                />)
              }
            })}
          </BurgerSection >
        </div>

      </div>
      {/* {
        modal &&
        <Modal
          title="Детали ингредиента"
          isVisible={isVisibleModal}
          onClose={cardClose}
        >
          <IngredientDetails />
        </Modal>

      } */}
    </div >
  );
}



export default BurgerIngredients;



