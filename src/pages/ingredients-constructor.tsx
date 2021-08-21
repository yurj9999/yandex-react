import {FC, ReactElement} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerContructor from '../components/burger-constructor/burger-constructor';

import styles from './ingredients-constructor.module.css';

export const IngredientsConstructor: FC<{}> = (): ReactElement => {
    return (
        <div className={styles.wrapper}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>
                <BurgerContructor/>
            </DndProvider>
        </div>
    );
}
