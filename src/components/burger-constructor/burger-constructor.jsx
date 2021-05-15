import {useContext} from 'react';
import {PropTypes} from 'prop-types';
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {ConstructorContext} from '../../services/burger-context';

import constructorStyle from './burger-constructor.module.css';

// css-костыль - убирает баги в ConstructorElement - согласовано с наставником - ждем правок в UI-либе
import './burger-constructor.css';

const BurgerConstructor = ({onConstructorClick}) => {
    const [ingredients] = useContext(ConstructorContext);

    const bun = ingredients.find(element => element.type === 'bun');
    const filling = ingredients.filter(element => element.type !== 'bun');
    const resultFood = [bun, ...filling, bun];

    const totalCost = resultFood.reduce((prev, current) => prev + current.price, 0);
    const ingredientsIds = resultFood.map(element => element._id);

    return (
        <section className={constructorStyle.wrapper}>
            <div className={constructorStyle.itemWrapper}>
                <div className="mb-2 mr-1">
                    <div className={`mb-2 ${constructorStyle.ingredient}`}>
                        <ConstructorElement 
                            thumbnail={resultFood[0].image_mobile}
                            text={resultFood[0].name}
                            price={resultFood[0].price}
                            isLocked={true}
                            type="top"/>
                        <DragIcon type="primary"/>
                    </div>
                </div>
                <div className={constructorStyle.mainIngredientsWrapper}>
                    {
                        resultFood.map((element, index) => 
                            (
                                index !== 0 && index !== resultFood.length - 1 && (
                                    <div key={element._id} className={`mb-2 ${constructorStyle.ingredient}`}>
                                        <ConstructorElement 
                                            thumbnail={element.image_mobile}
                                            text={element.name}
                                            price={element.price}
                                            isLocked={false}/>
                                        <DragIcon type="primary"/>
                                    </div>
                                )
                            )
                        )
                    }
                </div>
                <div className="mt-2 mr-1">
                    <div className={`mb-2 ${constructorStyle.ingredient}`}>
                        <ConstructorElement 
                            thumbnail={resultFood[resultFood.length - 1].image_mobile}
                            text={resultFood[resultFood.length - 1].name}
                            price={resultFood[resultFood.length - 1].price}
                            isLocked={true}
                            type="bottom"/>
                        <DragIcon type="primary"/>
                    </div>
                </div>
            </div>
            <div className={`mr-2 ${constructorStyle.footerWrapper}`}>
                <div className={constructorStyle.summWrapper}>
                    <p className={`text text_type_digits-default ${constructorStyle.summText}`}>{totalCost}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button onClick={() => onConstructorClick(ingredientsIds)} type="primary" size="large">Оформить заказ</Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    onConstructorClick: PropTypes.func.isRequired
};

export default BurgerConstructor;
