import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

import {DATA} from '../../utils/data';

import appStyle from './App.module.css';

function App() {
  return (

    <>
      <AppHeader/>
      <main className={appStyle.mainWrapper}>
        <BurgerIngredients ingredients={DATA}/>
      </main>
    </>


  );
}

export default App;
