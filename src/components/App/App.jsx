import React from 'react';

import AppHeader from '../app-header/header';
import BurgerIngredients from '../burger-ingredients/ingredients';
import BurgerContructor from '../burger-constructor/constructor';

// временные данные по ингридиентам
import {DATA} from '../../utils/data';

import appStyle from './app.module.css';

function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => setData([...DATA]), []);

  return (
    <div>
      <AppHeader/>
      <main className={appStyle.mainWrapper}>
        {
          data.length && (
            <>
              <BurgerIngredients ingredients={data}/>
              <BurgerContructor constructorElements={data}/>
            </>
          )
        }
      </main>
    </div>
  );
}

export default App;
