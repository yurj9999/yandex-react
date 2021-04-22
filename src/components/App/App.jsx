import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerContructor from '../BurgerConstructor/BurgerConstructor';

// временные данные по ингридиентам
import {DATA} from '../../utils/data';

import appStyle from './App.module.css';

function App() {
  return (
    <div>
      <AppHeader/>
      <main className={appStyle.mainWrapper}>
        <BurgerIngredients ingredients={DATA}/>
        <BurgerContructor constructorElements={DATA}/>
      </main>
    </div>
  );
}

export default App;
