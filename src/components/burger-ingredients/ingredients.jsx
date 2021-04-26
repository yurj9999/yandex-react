import React from 'react';
import PropTypes from 'prop-types';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import Product from '../product/product';

import ingredientsStyle from './ingredients.module.css';

export default class BurgerIngredients extends React.Component {
    render() {
        const {ingredients} = this.props;

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
                        <Product ingredients={ingredients} ingredientType="bun"/>
                    </div>
                    <div className={ingredientsStyle.block}>
                        <p className="text text_type_main-medium">Соусы</p>
                        <Product ingredients={ingredients} ingredientType="sauce"/>
                    </div>
                    <div className={ingredientsStyle.block}>
                        <p className="text text_type_main-medium">Начинки</p>
                        <Product ingredients={ingredients} ingredientType="main"/>
                    </div>
                </div>
            </section>
        );
    }
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired
};
