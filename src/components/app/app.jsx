import React, { useState } from "react";
import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import { getIngredients } from "../../services/actions/ingredients-action";
import { useDispatch } from "react-redux";
import { ProfilePage } from "../../pages/profile-page/profile-page";
import Modal from "./../modal/modal";

import { RegisterPage } from "../../pages/registration-page/registration-page";
import { ForgotPasswordPage } from "../../pages/forgot-password-page/forgotPasswordPage";
import { ResetPasswordPage } from "../../pages/reset-password-page/reset-password-page";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { LoginPage } from "../../pages/login-page/login-page";
import { OnlyAuth, OnlyUnAuth } from "./protected-route";
import { MainPage } from "../../pages/main-page/main-page";
import { checkUserAuth } from "../../services/actions/user-action";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";


function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  React.useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());

  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
          <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
          <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
          <Route path='/ingredients/:Id'
            element={<IngredientDetails />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path='/ingredients/:Id'
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
