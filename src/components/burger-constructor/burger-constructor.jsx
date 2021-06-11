import React, {useMemo, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useDrop, DndProvider} from 'react-dnd';
import {useLocation, useHistory} from 'react-router-dom';
import {HTML5Backend} from 'react-dnd-html5-backend';

import {getOrderDetails} from '../../services/utils/get-order-details';

import {MAX_BUNS_COUNT} from '../../services/constants';

import {actions as constructorActions} from '../../services/slices/constructor';

import BurgerFilling from './burger-filling/burger-filling';

import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import constructorStyle from './burger-constructor.module.css';

// css-костыль - убирает баги в ConstructorElement - согласовано с наставником - ждем правок в UI-либе
import './burger-constructor.css';

const BurgerConstructor = () => {
    const location = useLocation();
    const history = useHistory();

    const {setBuns, setFillings} = constructorActions;

    const {blockedAll} = useSelector(store => store.ingredients);
    const {bun, fillings} = useSelector(store => store.constructorIngredients);
    const {ingredients} = useSelector(store => store.ingredients);
    
    const dispatch = useDispatch();

    const totalCost = useMemo(() => {
        const result = [];

        result.push(bun.price * MAX_BUNS_COUNT || 0);
        result.push(fillings.reduce((prev, current) => prev + current.price, 0) || 0);

        return result.reduce((prev, curr) => prev + curr, 0);
    }, [bun, fillings]);

    const openModal = useCallback(() => {
        if (Object.keys(bun).length) {
            getOrderDetails([bun._id, ...fillings.map(item => item._id), bun._id])
                .then(item => {
                    if (item instanceof Error) throw new Error();
                    history.push({
                        pathname: '/start-order',
                        state: {
                            item,
                            modal: location
                        }
                    });
                })
                .catch(error => console.log(error.message));
        }  
    }, [bun, fillings, history, location]);

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
                <div ref={dropRef} className={constructorStyle.itemWrapper}>
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
                                            <div className={constructorStyle.mainIngredientsWrapper}>
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
                <Button onClick={openModal} type="primary" size="large">Оформить заказ</Button>
            </div>
        </section>)
    );
}

export default React.memo(BurgerConstructor);
