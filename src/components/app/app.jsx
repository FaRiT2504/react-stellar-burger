import React, { useEffect } from "react";
import styles from "./app.module.css";
import Modal from "./../modal/modal";
import AppHeader from "../app-header/app-header";
import { getIngredients } from "../../services/actions/ingredients-action";
import { useDispatch, useSelector } from "react-redux";
import { ProfilePage } from "../../pages/profile-page/profile-page";


import { RegisterPage } from "../../pages/registration-page/registration-page";
import { ForgotPasswordPage } from "../../pages/forgot-password-page/forgotPasswordPage";
import { ResetPasswordPage } from "../../pages/reset-password-page/reset-password-page";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { LoginPage } from "../../pages/login-page/login-page";
import { OnlyAuth, OnlyUnAuth } from "./protected-route";
import { MainPage } from "../../pages/main-page/main-page";
import { checkUserAuth, getUserData } from "../../services/actions/user-action";

import IngredientDetailsPage from "../../pages/ingredient-details-page/ingredient-details-page";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import { ingredientsDataSelector } from "../../services/selectors/ingredients-selector";
// import { getUser } from "../../services/actions/user-action";


function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };
  // const ingredients = useSelector(ingredientsDataSelector);
  // getUser()
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
    // dispatch(getUserData());
  }, []);
  console.log(location)
  // const ingredients = useSelector(
  //   (state) => state.ingredientsReducer.ingredients
  // );
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/" element={<OnlyAuth component={<MainPage />} />} /> */}
          <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
          <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
          <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />

          {/* <Route path='/ingredients/:ingredientId'
            element={<IngredientDetailsPage />} /> */}

          {/* <Route path="/ingredients/:ingredientId"
            element={<OnlyUnAuth component={<IngredientDetailsPage />} />} /> */}

          <Route path="/ingredients/:ingredientId"
            element={<IngredientDetails />} />

        </Routes>
        {background && (
          <Routes>
            <Route
              path="/ingredients/:ingredientId"
              element={
                <Modal
                  title="Детали ингредиента"
                  onClose={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </div >
  );
}

export default App;
