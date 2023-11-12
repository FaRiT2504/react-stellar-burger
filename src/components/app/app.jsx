import React, { useState } from "react";
import styles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import AppHeader from "../app-header/app-header";
import { getIngredients } from "../../services/actions/ingredients-action";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <pre className={styles.container}>
        <AppHeader />
        <div className={styles.content}>
          <DndProvider backend={HTML5Backend}>
            < BurgerIngredients count={1} />
            <BurgerConstructor />
          </DndProvider>
        </div>
      </pre>
    </div>
  );
}

export default App;
