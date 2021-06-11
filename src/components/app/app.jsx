import {Route, Switch, useLocation} from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import ModalOverlay from '../overlay-modal/modal-overlay';

import IngredientDetails from '../overlay-modal/modal/ingredient-details/ingredient-details';

import {ProtectedRoute} from '../protected-route/protected-route';

import {Registration, Autorization, RecoveryPassword, ResetPassword, UserProfile, EmptyPage404, OrderTape, OrderHistory, OrderInfo, IngredientsConstructor} from '../../pages';

import appStyle from './app.module.css';

function App() {
  const location = useLocation();
  const modalBackground = location.state && location.state.modal;

  return (
    <>
      <AppHeader/>
      <main className={appStyle.mainWrapper}>
        <Switch location={modalBackground || location}>
          <Route path="/" exact>
            <IngredientsConstructor/>
          </Route>

          <Route path="/ingredients/:id">
            <div className={appStyle.appWrapper}>
              <IngredientDetails/>
            </div>
          </Route>

          <ProtectedRoute exact path="/login" protectType="authorized">
            <Autorization/>
          </ProtectedRoute>
          <ProtectedRoute exact path="/register" protectType="authorized">
            <Registration/>
          </ProtectedRoute>
          <ProtectedRoute exact path="/forgot-password" protectType="authorized">
            <RecoveryPassword/>
          </ProtectedRoute>
          <ProtectedRoute exact path="/reset-password" protectType="authorized">
            <ResetPassword/>
          </ProtectedRoute>

          <Route path="/feed" exact>
            <OrderTape/>
          </Route>
          <Route path="/feed/:id" exact>
            <div className={appStyle.appWrapper}>
              <OrderInfo/>
            </div>
          </Route>

          <ProtectedRoute exact path="/profile" protectType="nonAuthorized">
            <UserProfile/>
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile/orders" protectType="nonAuthorized">
            <OrderHistory/>
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile/orders/:id" protectType="nonAuthorized">
            <div className={appStyle.appWrapper}>
              <OrderInfo/>
            </div>
          </ProtectedRoute>

          <Route>
            <EmptyPage404/>
          </Route>
        </Switch>

        <Route path="/ingredients/:id" exact>
          {modalBackground && <ModalOverlay/>}
        </Route>

        <ProtectedRoute exact path="/start-order" protectType="nonAuthorized">
          {modalBackground && <ModalOverlay/>}
        </ProtectedRoute>
        
        <Route path="/feed/:id" exact>
          {modalBackground && <ModalOverlay/>}
        </Route>

        <ProtectedRoute exact path="/profile/orders/:id" protectType="nonAuthorized">
          {modalBackground && <ModalOverlay/>}
        </ProtectedRoute>
      </main>
    </>
  );
}

export default App;
