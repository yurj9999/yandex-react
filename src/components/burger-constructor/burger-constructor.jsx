import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

// временные данные для модалки заказа
import {DATA} from '../../utils/temporary-data';

import constructorStyle from './burger-constructor.module.css';

// css-костыль - убирает баги в ConstructorElement - согласовано с наставником - ждем правок в UI-либе
import './burger-constructor.css';

const BurgerConstructor = ({ constructorElements, onCostClick }) => {
    return (
        <section className={constructorStyle.wrapper}>
            <div className={constructorStyle.itemWrapper}>
                <div className="mb-2 mr-1">
                    <div className={`mb-2 ${constructorStyle.ingredient}`}>
                        <ConstructorElement 
                            thumbnail={constructorElements[0].image_mobile}
                            text={constructorElements[0].name}
                            price={constructorElements[0].price}
                            isLocked={true}
                            type="top"/>
                        <DragIcon type="primary"/>
                    </div>
                </div>
                <div className={constructorStyle.mainIngredientsWrapper}>
                    {
                        constructorElements.map((element, index) => 
                            (
                                index !== 0 && index !== constructorElements.length - 1 && (
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
                            thumbnail={constructorElements[constructorElements.length - 1].image_mobile}
                            text={constructorElements[constructorElements.length - 1].name}
                            price={constructorElements[constructorElements.length - 1].price}
                            isLocked={true}
                            type="bottom"/>
                        <DragIcon type="primary"/>
                    </div>
                </div>
            </div>
            <div className={`mr-2 ${constructorStyle.footerWrapper}`}>
                <div className={constructorStyle.summWrapper}>
                    <p className={`text text_type_digits-default ${constructorStyle.summText}`}>{0}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button onClick={() => onCostClick(DATA)} type="primary" size="large">Оформить заказ</Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    constructorElements: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCostClick: PropTypes.func.isRequired
};

export default BurgerConstructor;
