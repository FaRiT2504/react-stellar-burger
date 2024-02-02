import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import styles from "./main-page.module.css";


export const MainPage = () => {
  return (
    <main className={styles.container}>
      <DndProvider backend={HTML5Backend}>
        < BurgerIngredients count={1} />
        <BurgerConstructor />
      </DndProvider>
    </main>
  )
}


