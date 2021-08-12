import React, {useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useDrop, DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import {MAX_BUNS_COUNT} from '../../services/constants';

import {actions as constructorActions} from '../../services/slices/constructor';

import BurgerFilling from './burger-filling/burger-filling';

import {ConfirmButton} from './confirm-button/confirm-button';

import {ConstructorElement, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import constructorStyle from './burger-constructor.module.css';

// css-костыль - убирает баги в ConstructorElement - согласовано с наставником - ждем правок в UI-либе
import './burger-constructor.css';

const BurgerConstructor = () => {
    const dispatch = useDispatch();

    const {setBuns, setFillings} = constructorActions;

    const {blockedAll} = useSelector(store => store.ingredients);
    const {bun, fillings} = useSelector(store => store.constructorIngredients);
    const {ingredients} = useSelector(store => store.ingredients);

    const totalCost = useMemo(() => {
        const result = [];

        result.push(bun.price * MAX_BUNS_COUNT || 0);
        result.push(fillings.reduce((prev, current) => prev + current.price, 0) || 0);

        return result.reduce((prev, curr) => prev + curr, 0);
    }, [bun, fillings]);

    const [, dropRef] = useDrop({
        accept: ['bun', 'main', 'sauce'],
        drop(item) {
            switch(item.type) {
                case 'bun':
                    dispatch(setBuns(ingredients.find(ingredient => ingredient._id === item.id)));
                    break;

                case 'main':
                    dispatch(setFillings(ingredients.find(ingredient => ingredient._id === item.id)));
                    break;

                case 'sauce':
                    dispatch(setFillings(ingredients.find(ingredient => ingredient._id === item.id)));
                    break;

                default:
                    return;
            }
        }
    });
    
    return (
        !blockedAll && (<section className={constructorStyle.wrapper}>
            {
                <div data-cy="constructor" ref={dropRef} className={constructorStyle.itemWrapper}>
                    {
                        Object.keys(bun).length || fillings.length ? (
                            <>
                                {
                                    Object.keys(bun).length ? (
                                        <div className="mb-2 mr-1">
                                            <div className={`mb-2 ${constructorStyle.ingredient}`}>
                                                <ConstructorElement 
                                                    thumbnail={bun.image_mobile}
                                                    text={bun.name}
                                                    price={bun.price}
                                                    isLocked={true}
                                                    type="top"/>
                                                <DragIcon type="primary"/>
                                            </div>
                                        </div>
                                    ) : null
                                }
                                {
                                    fillings.length ? (
                                        <DndProvider backend={HTML5Backend}>
                                            <div data-cy="filling-arr" className={constructorStyle.mainIngredientsWrapper}>
                                                {
                                                    fillings.map((element, index) =>
                                                        <BurgerFilling key={`${element._id}${index}`} element={element} index={index}/>
                                                    )  
                                                }
                                            </div>
                                        </DndProvider>
                                    ) : null
                                }
                                {
                                    Object.keys(bun).length ? (
                                        <div className="mt-2 mr-1">
                                            <div className={`mb-2 ${constructorStyle.ingredient}`}>
                                                <ConstructorElement 
                                                    thumbnail={bun.image_mobile}
                                                    text={bun.name}
                                                    price={bun.price}
                                                    isLocked={true}
                                                    type="bottom"/>
                                                <DragIcon type="primary"/>
                                            </div>
                                        </div>
                                    ) : null
                                }
                            </>
                        ) : (
                            <div className={constructorStyle.emptyWrapper}>
                                <p className="text text_type_main-default">Перетащите союда ингредиенты бургера</p>
                            </div>
                        )
                    }
                </div>
            }

            <div className={`mr-2 ${constructorStyle.footerWrapper}`}>
                <div className={constructorStyle.summWrapper}>
                    <p className={`text text_type_digits-default ${constructorStyle.summText}`}>{totalCost}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <ConfirmButton/>
            </div>
        </section>)
    );
}

export default React.memo(BurgerConstructor);
