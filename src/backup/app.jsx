import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Route, Switch, useLocation, useHistory} from 'react-router-dom';

import {getIngredients} from '../../services/actions/index';

import AppHeader from '../app-header/app-header';



import {Modal} from '../modal/modal';






import {IngredientDetails} from '../ingredient-details/ingredient-details';
import {OrderDetails} from '../order-details/order-details';
import {ProtectedRoute} from '../protected-route/protected-route';

import {
  Registration,
  Autorization,
  RecoveryPassword,
  ResetPassword,
  UserProfile,
  EmptyPage404,
  OrderTape,
  OrderHistory,
  OrderInfo,
  IngredientsConstructor
} from '../../pages';

import appStyle from './app.module.css';





// удал /backup !!!

// index.tsx - какой тип возвр configureStore




function App() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const modalBackground = location.state && location.state.modal;

  if (history.action === 'POP') {
    location.state = {};
  }

  useEffect(() => dispatch(getIngredients()), [dispatch]);

  return (
    <>
      <AppHeader/>
      <main className={appStyle.mainWrapper}>
        <Switch location={modalBackground || location}>
          <Route exact path="/">
            <IngredientsConstructor/>
          </Route>

          <Route exact path="/ingredients/:id">
            <div className={appStyle.appWrapper}>
              <IngredientDetails/>
            </div>
          </Route>

          <Route exact path="/feed">
            <OrderTape/>
          </Route>
          <Route exact path="/feed/:id">
            <div className={appStyle.appWrapper}>
              <OrderInfo showOrders="all"/>
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

          <ProtectedRoute exact path="/profile" protectType="nonAuthorized">
            <UserProfile/>
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile/orders" protectType="nonAuthorized">
            <OrderHistory/>
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile/orders/:id" protectType="nonAuthorized">
            <div className={appStyle.appWrapper}>
              <OrderInfo showOrders="my"/>
            </div>
          </ProtectedRoute>

          <Route>
            <EmptyPage404/>
          </Route>
        </Switch>
      </main>
      {
        modalBackground && 
        (
          <>
            <Switch>
              <Route exact path="/ingredients/:id">
                <Modal>
                  <IngredientDetails/>
                </Modal>
              </Route>

              <Route exact path="/feed/:id">
                <Modal>
                  <OrderInfo showOrders="all"/>
                </Modal>
              </Route>

              <ProtectedRoute exact path="/start-order" protectType="nonAuthorized">
                <Modal>
                  <OrderDetails/>
                </Modal>
              </ProtectedRoute>

              <ProtectedRoute exact path="/profile/orders/:id" protectType="nonAuthorized">
                <Modal>
                  <OrderInfo showOrders="my"/>
                </Modal>
              </ProtectedRoute>
            </Switch>
          </>
        )
      }
    </>
  );
}

export default App;
