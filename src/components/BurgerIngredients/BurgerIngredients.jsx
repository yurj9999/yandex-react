import React from 'react';

import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientsStyle from './BurgerIngredients.module.css';

const Product = ({ ingredients, ingredientType }) => {
    return ingredients.map(item => item.type === ingredientType && 
        (
            <div key={item._id} className={ingredientsStyle.ingredientWrapper}>
                <div className={ingredientsStyle.ingredient}>
                    <img className="mb-1" src={item.image}/>
                    <div className={ingredientsStyle.costWrapper}>
                        <p className="text text_type_digits-default mr-1 mb-1">{item.price}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <p className={`text text_type_main-default ${ingredientsStyle.nameIngredient}`}>{item.name}</p>
                </div>

                {/*судя по всему Counter будет выставляться по условию, пока отображаю на всех*/}
                <Counter count={1} size="default"/>
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