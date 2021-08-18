import React, {useState, useRef} from 'react';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

import ProductGroup from './product-group/product-group';

import ingredientsStyle from './burger-ingredients.module.css';

const LOW_PARENT_TOP = 0;
const HIGH_PARENT_TOP = 100;

const BurgerIngredients = () => {
    const [tab, setTab] = useState('breads');

    const breadsGroup = useRef(null);
    const saucesGroup = useRef(null);
    const fillingsGroup = useRef(null);
    const ingredientBlock = useRef(null);

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
    };

    const onScrollTab = () => {
        const parentTop = ingredientBlock.current.getBoundingClientRect().top;
        const breadTop = breadsGroup.current.getBoundingClientRect().top;
        const saucesTop = saucesGroup.current.getBoundingClientRect().top;
        const fillingsTop = fillingsGroup.current.getBoundingClientRect().top;

        const breadPos = breadTop - parentTop;
        const saucesPos = saucesTop - parentTop;
        const fillingsPos = fillingsTop - parentTop;

        if (breadPos < HIGH_PARENT_TOP && breadPos >= LOW_PARENT_TOP) {
            setTab('breads');
        }

        if (saucesPos < HIGH_PARENT_TOP && saucesTop >= LOW_PARENT_TOP) {
            setTab('sauces');
        }

        if (fillingsPos < HIGH_PARENT_TOP && fillingsPos >= LOW_PARENT_TOP) {
            setTab('fillings');
        }
    }

    return (
        <section className={ingredientsStyle.wrapper}>
            <p className={`text text_type_main-large ${ingredientsStyle.title}`}>Соберите бургер</p>
            <div data-testid="tabs" className={ingredientsStyle.tabs}>
                <Tab value="breads" active={tab === 'breads'} onClick={() => onTabClick('breads')}>Булки</Tab>
                <Tab value="sauces" active={tab === 'sauces'} onClick={() => onTabClick('sauces')}>Соусы</Tab>
                <Tab value="fillings" active={tab === 'fillings'} onClick={() => onTabClick('fillings')}>Начинки</Tab>
            </div>
            <div ref={ingredientBlock} onScroll={onScrollTab} className={ingredientsStyle.menuWrapper}>
                <div ref={breadsGroup} className={ingredientsStyle.block}>
                    <p className="text text_type_main-medium">Булки</p>
                    <ProductGroup ingredientType="bun"/>
                </div>
                <div ref={saucesGroup} className={ingredientsStyle.block}>
                    <p className="text text_type_main-medium">Соусы</p>
                    <ProductGroup ingredientType="sauce"/>
                </div>
                <div ref={fillingsGroup} className={ingredientsStyle.block}>
                    <p className="text text_type_main-medium">Начинки</p>
                    <ProductGroup ingredientType="main"/>
                </div>
            </div>
        </section>
    );
}

export default React.memo(BurgerIngredients);
