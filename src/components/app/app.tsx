import React, { FC } from "react";
import styles from "./app.module.css";
import Modal from "../modal/modal";
import AppHeader from "../app-header/app-header";
import { getIngredients } from "../../services/actions/ingredients-action";
// import { useDispatch, useSelector } from "react-redux";
import { ProfilePage } from "../../pages/profile-page/profile-page";
import { RegisterPage } from "../../pages/registration-page/registration-page";
import { useSelector } from "../../utils/hooks/useSelector";
import { useDispatch } from "../../utils/hooks/useDispatch";

import Order from "../order/order";
import FeedPage from "../../pages/feed-page/feed-page";
import { ForgotPasswordPage } from "../../pages/forgot-password-page/forgot-password-page";
import { ResetPasswordPage } from "../../pages/reset-password-page/reset-password-page";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { LoginPage } from "../../pages/login-page/login-page";
import { OnlyAuth, OnlyUnAuth } from "./protected-route";
import { MainPage } from "../../pages/main-page/main-page";
import { checkUserAuth } from "../../services/actions/user-action";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
// import { ingredientsDataSelector, ingredientsIsLoadingSelector } from "../../services/selectors/ingredients-selector";
import Profile from "../profile/profile";
// import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws-action'
// import StatusBoard from "../status-board/status-board"
// import OrdersList from "../feed-list/feed-list";
import ProfileList from "../profile-list/profile-list";
// import { getOrder } from "../../pages/feed-page/feed-page";

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;
  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };
  // const ordersInfo = useSelector((state) => state.wsReducer.ordersInfo);
  const ingredients = useSelector((state) =>
    state.ingredientsReducer.ingredients)
  const isLoading = useSelector((state) => state.ingredientsReducer.isLoading);
  React.useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, []);
  // const lenght: number | undefined | null = ingredients.length

  return (
    (!isLoading && ingredients!!.length > 0 ?
      (< div className={styles.app} >
        <div className={styles.container}>
          <AppHeader />
          <Routes location={background || location}>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
            <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
            <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
            <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} >
              <Route index element={<OnlyAuth component={<Profile />} />} />
              <Route path="orders" element={<OnlyAuth component={<ProfileList />} />} />
            </Route>

            <Route path="/feed/:number"
              element={<Order />} />
            <Route
              path="/profile/orders/:number"
              element={<OnlyAuth component={<Order />} />} />
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

              <Route
                path="/profile/orders/:number"
                element={
                  <Modal
                    onClose={handleModalClose}>
                    <Order />
                  </Modal>
                }
              />

              <Route
                path="/feed/:number"
                element={
                  <Modal
                    onClose={handleModalClose}>
                    <Order />
                  </Modal>
                }
              />

            </Routes>
          )}
        </div>
      </div >) : null
    )
  )

}

export default App;


