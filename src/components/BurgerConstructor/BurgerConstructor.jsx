import React from 'react';
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import constructorStyle from './BurgerConstructor.module.css';

export default class BurgerConstructor extends React.Component {
    render() {
        const {constructorElements} = this.props;

        const setIngredientType = (index, maxLength) => {
            switch(index) {
                case 0:
                    return 'top';
                case maxLength - 1:
                    return 'bottom';
                default:
                    return;
            }
        }

        return (
            <section className={constructorStyle.wrapper}>
                <div className={constructorStyle.itemWrapper}>
                    {
                        constructorElements.map((element, index) => 
                            (
                                <div key={element._id} className={`mb-2 ${constructorStyle.ingredient}`}>
                                    <ConstructorElement 
                                        thumbnail={element.image_mobile}
                                        text={element.name}
                                        price={element.price}
                                        isLocked={false}
                                        type={setIngredientType(index, constructorElements.length)}/>
                                    <DragIcon type="primary"/>
                                </div>
                            )
                        )
                    }
                </div>
                <div className={`mr-2 ${constructorStyle.footerWrapper}`}>
                    <div className={constructorStyle.summWrapper}>
                        <p className={`text text_type_digits-default ${constructorStyle.summText}`}>{0}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button type="primary" size="large">Оформить заказ</Button>
                </div>
            </section>
        );
    }
}

BurgerConstructor.propTypes = {
    constructorElements: PropTypes.arrayOf(PropTypes.object).isRequired
};
