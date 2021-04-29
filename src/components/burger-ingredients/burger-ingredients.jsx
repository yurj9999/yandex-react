import React from 'react';
import PropTypes from 'prop-types';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

import ProductGroup from '../product-group/product-group';

import ingredientsStyle from './burger-ingredients.module.css';

const BurgerIngredients = ({ ingredients, onIngredientClick }) => {
    const [tab, setTab] = React.useState('breads');

    const breadsGroup = React.createRef(null);
    const saucesGroup = React.createRef(null);
    const fillingsGroup = React.createRef(null);

    const onTabClick = (currentTab) => {
        const scrollParameter = {
            behavior: 'smooth'
        };
        setTab(currentTab);

        switch(currentTab) {
            case 'breads':
                breadsGroup.current.scrollIntoView(scrollParameter);
                break;
            case 'sauces':
                saucesGroup.current.scrollIntoView(scrollParameter);
                break;
            default:
                fillingsGroup.current.scrollIntoView(scrollParameter);
                break;
        }
    }

    return (
        <section className={ingredientsStyle.wrapper}>
            <p className={`text text_type_main-large ${ingredientsStyle.title}`}>Соберите бургер</p>
            <div className={ingredientsStyle.tabs}>
                <Tab value="breads" active={tab === 'breads'} onClick={() => onTabClick('breads')}>Булки</Tab>
                <Tab value="sauces" active={tab === 'sauces'} onClick={() => onTabClick('sauces')}>Соусы</Tab>
                <Tab value="fillings" active={tab === 'fillings'} onClick={() => onTabClick('fillings')}>Начинки</Tab>
            </div>
            <div className={ingredientsStyle.menuWrapper}>
                <div ref={breadsGroup} className={ingredientsStyle.block}>
                    <p className="text text_type_main-medium">Булки</p>
                    <ProductGroup onProductClick={onIngredientClick} ingredients={ingredients} ingredientType="bun"/>
                </div>
                <div ref={saucesGroup} className={ingredientsStyle.block}>
                    <p className="text text_type_main-medium">Соусы</p>
                    <ProductGroup onProductClick={onIngredientClick} ingredients={ingredients} ingredientType="sauce"/>
                </div>
                <div ref={fillingsGroup} className={ingredientsStyle.block}>
                    <p className="text text_type_main-medium">Начинки</p>
                    <ProductGroup onProductClick={onIngredientClick} ingredients={ingredients} ingredientType="main"/>
                </div>
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
    onIngredientClick: PropTypes.func.isRequired
};

export default BurgerIngredients;
