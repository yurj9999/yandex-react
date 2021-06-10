import {useSelector} from 'react-redux';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import ModalOverlay from '../overlay-modal/modal-overlay';

import {ProtectedRoute} from '../protected-route/protected-route';

import {Registration, Autorization, RecoveryPassword, ResetPassword, UserProfile, EmptyPage404, OrderInfo, OrderTape, OrderHistory, IngredientsConstructor} from '../../pages';

import appStyle from './app.module.css';

function App() {
  
  /*function deleteAllCookies() {
    var c = document.cookie.split("; ");
    for (let i in c) 
     document.cookie =/^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT";    
   }*/
  //deleteAllCookies();

  const {modalType} = useSelector(store => store.modal);

  // попр верстку в шапке + выделение в меню в шапке
  // заменить Link на NavLink (сам стили нужные применяет) см доку react-router - в шапке и в мень профиля и в меню заказов
  // exact указ у навлинка

  // менять цвет дли линка в меню профиля и проч можно так:
  // const isConstructor = !!useRouteMatch({ path: '/', exact: true});
  // const isFeed = !!useRouteMatch('/feed');
  // const isProfile = !!useRouteMatch('/profile');
  
  // профилирование - где нужно исп useMemo, useCallback
  // + см желтые алерты


  // не проваливается в историю заказов + если там обновить стр некорректно работает авторизация и выход

  return (
    <>
      <Router>
        <AppHeader/>
        <main className={appStyle.mainWrapper}>
          <Switch>
            <Route path="/" exact>
              <IngredientsConstructor/>
            </Route>



            <ProtectedRoute path="/login" protectType="authorized">
              <Autorization/>
            </ProtectedRoute>
            <ProtectedRoute path="/register" protectType="authorized">
              <Registration/>
            </ProtectedRoute>
            <ProtectedRoute path="/forgot-password" protectType="authorized">
              <RecoveryPassword/>
            </ProtectedRoute>
            <ProtectedRoute path="/reset-password" protectType="authorized">
              <ResetPassword/>
            </ProtectedRoute>


            <Route path="/feed" exact>
              <OrderTape/>
            </Route>
            <Route path="/feed/:id" exact>
              <OrderInfo/>
            </Route>



            
            <ProtectedRoute path="/profile" protectType="nonAuthorized">
              <UserProfile/>
            </ProtectedRoute>
            <ProtectedRoute path="/profile/orders" protectType="nonAuthorized">
              <OrderHistory/>
            </ProtectedRoute>
            <ProtectedRoute path="/profile/orders/:id" protectType="nonAuthorized">
              <OrderInfo/>
            </ProtectedRoute>




            <Route path="/ingredients/:id" exact>
              <></>
            </Route>




            <Route>
              <EmptyPage404/>
            </Route>



          </Switch>
        </main>
        {
          modalType && <ModalOverlay/>
        }
      </Router>
    </>
  );
}

export default App;
