import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Route, Switch, useLocation, useHistory} from 'react-router-dom';

import {getIngredients} from '../../services/actions/index';

import AppHeader from '../app-header/app-header';
import ModalOverlay from '../overlay-modal/modal-overlay';

import IngredientDetails from '../overlay-modal/modal/ingredient-details/ingredient-details';
import {ProtectedRoute} from '../protected-route/protected-route';

import {WS_CONNECT_ORDER_TAPE, WS_DISCONNECT_ORDER_TAPE} from '../../services/actions/index';

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

function App() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const modalBackground = location.state && location.state.modal;

  if (history.action === 'POP') {
    location.state = {};
  }

  useEffect(() => {
    dispatch(getIngredients());

    dispatch({
      type: WS_CONNECT_ORDER_TAPE,
      payload: {
          url: 'wss://norma.nomoreparties.space/orders/all'
      }
    });

    return () => {
      dispatch({
        type: WS_DISCONNECT_ORDER_TAPE
      });
    };
  }, [dispatch]);

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
      </main>
      {
        modalBackground && 
        (
          <>
            <Route path="/ingredients/:id" exact>
              <ModalOverlay/>
            </Route>

            <ProtectedRoute exact path="/start-order" protectType="nonAuthorized">
              <ModalOverlay/>
            </ProtectedRoute>

            <Route path="/feed/:id" exact>
              <ModalOverlay/>
            </Route>

            <ProtectedRoute exact path="/profile/orders/:id" protectType="nonAuthorized">
              <ModalOverlay/>
            </ProtectedRoute>
          </>
        )
      }
    </>
  );
}

export default App;
