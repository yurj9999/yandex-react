import {useState, useEffect} from 'react';

import AppHeader from '../app-header/header';
import BurgerIngredients from '../burger-ingredients/ingredients';
import BurgerContructor from '../burger-constructor/constructor';
import ModalOverlay from '../overlay-modal/overlay';
import IngredientDetails from '../ingredient-details/details';
import OrderDetails from '../order-details/order';

import appStyle from './app.module.css';

const URL_DATA = 'https://norma.nomoreparties.space/api/ingredients';
const MAX_BUNS = 2;

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [bunsCount, setBuns] = useState(0);
  const [isOverlayOpen, setOpen] = useState(false);
  const [template, setTemplate] = useState(null);

  const countUpdater = (id) => {
    setIngredients([...ingredients.map(item => {
      if (item._id === id) {
        item.count = item.count + 1;
      }
      return item;
    })]);
  }

  const closeModal = () => {
    setOpen(false);
  }

  const openCostModal = (costData) => {
    setOpen(true);
    setTemplate(<OrderDetails data={costData}/>);
  }

  const openIngredientModal = (ingredient) => {
    setOpen(true);
    setTemplate(<IngredientDetails data={ingredient}/>);

    // ниже описана ф-я увеличения счетчика возле изображения ингредиента по клику, решил сделать для тренировки + в будущих спринтах
    // планирую ее модернизировать для использования совместно с drag-n-drop
    switch(ingredient.type) {
      case 'bun':
        if (bunsCount !== MAX_BUNS) {
          setBuns(bunsCount + 1);
          countUpdater(ingredient._id);
        } else {
          console.log('buns is add');
        }
        break;
      
      default:
        if (bunsCount !== MAX_BUNS) {
          console.log('choose buns first');
        } else {
          countUpdater(ingredient._id);
        }
        break;
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetch(URL_DATA);
        const {data} = await result.json();

        // создаю копию данных с добавлением поля для счетчика - count
        const updateData = data.map(item => {
          item.count = 0;
          return item;
        });

        setIngredients([...updateData]);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <AppHeader/>
      <main className={appStyle.mainWrapper}>
        {
          ingredients.length ? (
            <>
              <BurgerIngredients ingredients={ingredients} onIngredientClick={openIngredientModal}/>
              <BurgerContructor constructorElements={ingredients} onCostClick={openCostModal}/>
            </>
          ) : null
        }
      </main>
      {isOverlayOpen && (<ModalOverlay onOverlayClick={closeModal}>{template || null}</ModalOverlay>)}
    </div>
  );
}

export default App;
