import {useSelector} from 'react-redux';

import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerContructor from '../burger-constructor/burger-constructor';
import ModalOverlay from '../overlay-modal/modal-overlay';

import appStyle from './app.module.css';

function App() {
  const {modalType} = useSelector(store => store.modal);

  return (
    <div>
      <AppHeader/>
      <main className={appStyle.mainWrapper}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <BurgerContructor/> 
        </DndProvider>
      </main>
      {
        modalType && <ModalOverlay/>
      }
    </div>
  );
}

export default App;
