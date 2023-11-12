import React, { useState } from "react";
import styles from "./app.module.css";
import { URL } from "../../utils/constants";
// import { data } from "../../utils/data";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import AppHeader from "../app-header/app-header";
// // import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import OrderDetails from '../modal/order-details/order-details';

function App() {
  const [data, setData] = React.useState([]);
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [modal, setModal] = React.useState(null);
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
  const getResponse = res =>
    res.ok
      ? res.json()
      : Promise.reject(`error: ${res.status} ${res.statusText}`)

  function getData() {
    setIsLoading(true);
    fetch(
      URL, { method: "GET" }
    ).then(getResponse)
      .then(
        object => (object.success && object.data.length)
          ? object.data
          : Promise.reject(`error: ${object}`)
      ).then(
        object => {
          setData(object);
        }
      ).catch(
        error => {
          console.error("error:", error.message);
          setHasError(true);
        }
      ).finally(
        () => {
          setIsLoading(false);
        }
      );
  };

  React.useEffect(
    getData,
    []
  );

  const openModal = React.useCallback(
    () => {
      setIsVisibleModal(true);
    },
    []
  );

  const closeModal = React.useCallback(
    () => {
      setIsVisibleModal(false);
    },
    []
  );
  const cardOnClick = React.useCallback(
    (item) => {
      return () => {
        setModalData(item);
        setModal("ingredient");
        openModal();
      };
    },
    []
  );

  const orderOnClick = React.useCallback(
    () => {
      setModalData("034536");
      setModal("order");
      openModal();
    },
    []
  );


  return (
    <div className={styles.app}>
      <pre className={styles.container}>
        <AppHeader />
        <div className={styles.content}>
          < BurgerIngredients data={data} cardOnClick={cardOnClick} count={1} />
          <BurgerConstructor data={data} orderOnClick={orderOnClick} />
        </div>
      </pre>
      {
        isVisibleModal &&
        <Modal
          title={modal === "ingredient" ? "Детали ингредиента" : ""}
          isVisible={isVisibleModal}
          onClose={closeModal}
        >
          {modal === "ingredient" && <IngredientDetails ingredient={modalData} />}
          {modal === "order" && <OrderDetails order={modalData} />}
        </Modal>

      }
    </div>
  );
}

export default App;