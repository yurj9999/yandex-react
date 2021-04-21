import React from 'react';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientsStyle from './BurgerIngredients.module.css';

const Product = ({ ingredients, ingredientType }) => {
    return ingredients.map(item => item.type === ingredientType && 
        (
            <div key={item._id} className={ingredientsStyle.ingredient}>
                {item.name}
            </div>
        )
    );
}

export default class BurgerIngredients extends React.Component {
    render() {

        const {ingredients} = this.props;

        console.log(ingredients);

        return (
            <section className={ingredientsStyle.wrapper}>
                <p className={`text text_type_main-large ${ingredientsStyle.title}`}>Соберите бургер</p>
                
                <div className={ingredientsStyle.tabs}>
                    <Tab value="breads" active={true} onClick={() => {}}>Булки</Tab>
                    <Tab value="sauces" active={false} onClick={() => {}}>Соусы</Tab>
                    <Tab value="fillings" active={false} onClick={() => {}}>Начинки</Tab>
                </div>

                <div className={ingredientsStyle.menuWrapper}>
                    
                    <div className={ingredientsStyle.block}>
                        <p className="text text_type_main-medium">Булки</p>
                        <div className={`pt-3 pb-3 pr-1 pl-2 ${ingredientsStyle.info}`}>
                            <Product ingredients={ingredients} ingredientType="bun"/>
                        </div>
                    </div>

                    <div className={ingredientsStyle.block}>
                        <p className="text text_type_main-medium">Соусы</p>
                        <div className={`pt-3 pb-3 pr-1 pl-2 ${ingredientsStyle.info}`}>
                            <Product ingredients={ingredients} ingredientType="sauce"/>
                        </div>
                    </div>

                    <div className={ingredientsStyle.block}>
                        <p className="text text_type_main-medium">Начинки</p>
                        <div className={`pt-3 pb-3 pr-1 pl-2 ${ingredientsStyle.info}`}>
                            <Product ingredients={ingredients} ingredientType="main"/>
                        </div>
                    </div>

                </div>


            </section>
            
        );
    }
}