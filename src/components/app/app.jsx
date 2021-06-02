import {useSelector} from 'react-redux';

import AppHeader from '../app-header/app-header';
import ModalOverlay from '../overlay-modal/modal-overlay';

import {Registration, Autorization, RecoveryPassword, ResetPassword, UserProfile, EmptyPage404, OrderInfo, OrderTape, OrderHistory, IngredientsConstructor} from '../../pages';

import appStyle from './app.module.css';

function App() {
  const {modalType} = useSelector(store => store.modal);

  return (
    <div>
      <AppHeader/>
      <main className={appStyle.mainWrapper}>
        {/*<Registration/>*/}
        {/*<Autorization/>*/}
        {/*<RecoveryPassword/>*/}
        {/*<ResetPassword/>*/}
        {/*<UserProfile/>*/}
        {/*<EmptyPage404/>*/}
        {/*<OrderInfo/>*/}
        {/*<OrderTape/>*/}
        {/*<OrderHistory/>*/}
        {/*<IngredientsConstructor/>*/}

      </main>
      {
        modalType && <ModalOverlay/>
      }
    </div>
  );
}

export default App;
