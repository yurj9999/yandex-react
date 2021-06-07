import {useSelector} from 'react-redux';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import ModalOverlay from '../overlay-modal/modal-overlay';

import {Registration, Autorization, RecoveryPassword, ResetPassword, UserProfile, EmptyPage404, OrderInfo, OrderTape, OrderHistory, IngredientsConstructor} from '../../pages';

import appStyle from './app.module.css';

function App() {
  const {modalType} = useSelector(store => store.modal);

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
            <Route path="/profile" exact>
              <UserProfile/>
            </Route>
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
