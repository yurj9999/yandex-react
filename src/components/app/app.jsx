import {useSelector} from 'react-redux';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import ModalOverlay from '../overlay-modal/modal-overlay';

import {Registration, Autorization, RecoveryPassword, ResetPassword, UserProfile, EmptyPage404, OrderInfo, OrderTape, OrderHistory, IngredientsConstructor} from '../../pages';

import appStyle from './app.module.css';

function App() {
  const {modalType} = useSelector(store => store.modal);

  // попр верстку в шапке + выделение в меню в шапке
  // заменить Link на NavLink (сам стили нужные применяет) см доку react-router - в шапке и в мень профиля и в меню заказов
  // exact указ у навлинка

  // менять цвет дли линка в меню профиля и проч можно так:
  // const isConstructor = !!useRouteMatch({ path: '/', exact: true});
  // const isFeed = !!useRouteMatch('/feed');
  // const isProfile = !!useRouteMatch('/profile');
  
  // профилирование - где нужно исп useMemo, useCallback ?
  
  // возможно обновл куки нужно кажд раз при смене роута, т.к. жц куки может закончиться
  // как сохр куку см раб стол

  // import { Redirect } from 'react-router-dom'; - для переадресации
  // пример
  // <Route exact path="/">
  // {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
  // </Route>

  // Если пользователь заходит на /profile и вложенные роуты, то проверяется наличие токена. Остальные роуты не защищены авторизацией
  // в конструктор и в ленту заказов можно попасть без авторизации

  // Авторизация нужна для доступа к профилю - данные пользователя и его заказы, отправку бургера тоже нужно бы защитить авторизацией,
  // но это по видимому не реализовано т.к. иначе не было бы возможности отправлять запрос из конструктора на 1 и 2 спринте

  // в апп проверяем наличие куки

  return (
    <>
      <Router>
        <AppHeader/>
        <main className={appStyle.mainWrapper}>
          <Switch>
            <Route path="/" exact>
              <IngredientsConstructor/>
            </Route>
            <Route path="/login" exact>
              <Autorization/>
            </Route>
            <Route path="/register" exact>
              <Registration/>
            </Route>
            <Route path="/forgot-password" exact>
              <RecoveryPassword/>
            </Route>
            <Route path="/reset-password" exact>
              <ResetPassword/>
            </Route>
            <Route path="/feed" exact>
              <OrderTape/>
            </Route>
            <Route path="/feed/:id" exact>
              <OrderInfo/>
            </Route>
            {/*защищ роут*/}
            <Route path="/profile" exact>
              <UserProfile/>
            </Route>
            {/*защищ роут*/}
            <Route path="/profile/orders" exact>
              <OrderHistory/>
            </Route>
            <Route path="/profile/orders/:id" exact>
              <OrderInfo/>
            </Route>
            <Route path="/ingredients/:id" exact>
              {/*стр ингредиента - в след*/}
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
