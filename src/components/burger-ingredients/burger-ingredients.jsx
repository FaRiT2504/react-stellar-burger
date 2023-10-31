import React, { useState } from "react";
import PropTypes from "prop-types";
import BurgerTab from './burger-tab/burger-tab';
import styles from './burger-ingredients.module.css';
import BurgerCard from './burger-card/burger-card';
import BurgerSection from './burger-section/burger-section';

function BurgerIngredients({ data, cardOnClick, count }) {

  const [current, setCurrent] = React.useState("bun")
  const handleButtonClick = (currentTab) => {
    setCurrent(currentTab)
    const element = document.getElementById(currentTab);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (

    <div className={`${styles.container} pt-10`} >
      <h1 className="text text_type_main-large mb-5" >Соберите бургер</h1>
      <BurgerTab current={current} setCurrent={setCurrent} handleButtonClick={handleButtonClick} />
      <div className={`${styles.containerScroll} custom-scroll`}>

        <BurgerSection title={"Булки"} id={"bun"}>
          {data.map(function (item) {
            if (item.type === "bun") {
              return (<BurgerCard key={item._id} onClick={cardOnClick(item)}
                dataCard={item}
                count={count}
              />)
            }
          })}

        </BurgerSection>

        <BurgerSection title={"Соусы"} id={"sauce"}>
          {data.map(function (item) {
            if (item.type === "sauce") {
              return (<BurgerCard key={item._id} onClick={cardOnClick(item)}
                dataCard={item}
                count={count}
              />)
            }
          })}
        </BurgerSection>

        <BurgerSection title={"Начинки"} id={"main"}>
          {data.map(function (item) {
            if (item.type === "main") {
              return (<BurgerCard key={item._id} onClick={cardOnClick(item)}
                dataCard={item}
                count={count}
              />)
            }
          })}
        </BurgerSection >
      </div>
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

// const [isModalOpened, setIsModalOpened] = useState(false);

// const handleOpenModal = () => {
//   setIsModalOpened(true);
// };

// const handleCloseModal = () => {
//   setIsModalOpened(false);
// };

