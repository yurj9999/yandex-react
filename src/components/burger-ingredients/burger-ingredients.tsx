import React, {useState, useRef, FC, ReactElement} from 'react';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';



import ProductGroup from './product-group/product-group';



import {LOW_PARENT_TOP, HIGH_PARENT_TOP} from '../../services/constants';

import ingredientsStyle from './burger-ingredients.module.css';

const BurgerIngredients: FC<{}> = (): ReactElement => {
    const [tab, setTab] = useState('breads');

    const breadsGroup = useRef<HTMLDivElement>(null);
    const saucesGroup = useRef<HTMLDivElement>(null);
    const fillingsGroup = useRef<HTMLDivElement>(null);
    const ingredientBlock = useRef<HTMLDivElement>(null);

    const onTabClick = (currentTab: 'breads' | 'sauces' | 'fillings'): void => {
        const scrollParameter: ScrollIntoViewOptions = {
            behavior: 'smooth'
        };

        setTab(currentTab);

        switch(currentTab) {
            case 'breads':
                breadsGroup.current !== null && breadsGroup.current.scrollIntoView(scrollParameter);
                break;
            case 'sauces':
                saucesGroup.current !== null && saucesGroup.current.scrollIntoView(scrollParameter);
                break;
            default:
                fillingsGroup.current !== null && fillingsGroup.current.scrollIntoView(scrollParameter);
                break;
        }
    };

    const onScrollTab = (): void => {
        const parentTop: number = ingredientBlock.current !== null ? ingredientBlock.current.getBoundingClientRect().top : 0;
        const breadTop: number = breadsGroup.current !== null ? breadsGroup.current.getBoundingClientRect().top : 0;
        const saucesTop: number = saucesGroup.current !== null ? saucesGroup.current.getBoundingClientRect().top : 0;
        const fillingsTop: number = fillingsGroup.current !== null ? fillingsGroup.current.getBoundingClientRect().top : 0;

        const breadPos: number = breadTop - parentTop;
        const saucesPos: number = saucesTop - parentTop;
        const fillingsPos: number = fillingsTop - parentTop;

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
            <div data-cy="ingredients-list" ref={ingredientBlock} onScroll={onScrollTab} className={ingredientsStyle.menuWrapper}>
                <div data-cy="buns" ref={breadsGroup} className={ingredientsStyle.block}>
                    <p className="text text_type_main-medium">Булки</p>
                    <ProductGroup ingredientType="bun"/>
                </div>
                <div data-cy="sauces" ref={saucesGroup} className={ingredientsStyle.block}>
                    <p className="text text_type_main-medium">Соусы</p>
                    <ProductGroup ingredientType="sauce"/>
                </div>
                <div data-cy="fillings" ref={fillingsGroup} className={ingredientsStyle.block}>
                    <p className="text text_type_main-medium">Начинки</p>
                    <ProductGroup ingredientType="main"/>
                </div>
            </div>
        </section>
    );
}

export default React.memo(BurgerIngredients);
