import React from 'react';

import AppHeader from '../app-header/header';
import BurgerIngredients from '../burger-ingredients/ingredients';
import BurgerContructor from '../burger-constructor/constructor';

// временные данные по ингридиентам
import {DATA} from '../../utils/data';

import appStyle from './app.module.css';

/*
  комментарии по замечаниям:

  по замечанию №2:
  проконсультировался с наставником по поводу сохранения картинок из захардкоженных данных - идею не поддержал, нет смысла
  это делать на данном этапе
  по поводу сохранения папок fonts, images - так как на текущем этапе в папках ничего нет, то гит не может их отслеживать, 
  следовательно, пустые папки не могут быть залиты на github
 */

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
