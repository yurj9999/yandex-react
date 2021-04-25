import productStyle from './product.module.css';
import PropTypes from 'prop-types';

import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

const Product = ({ ingredients, ingredientType }) => {
    return (
        <ul className={`pt-3 pb-3 pr-1 pl-2 ${productStyle.info}`}>
            {
                ingredients.map(item => item.type === ingredientType && 
                    (
                        <li key={item._id} className={productStyle.ingredientWrapper}>
                            <div className={productStyle.ingredient}>
                                <img className="mb-1" src={item.image}/>
                                <div className={productStyle.costWrapper}>
                                    <p className="text text_type_digits-default mr-1 mb-1">{item.price}</p>
                                    <CurrencyIcon type="primary"/>
                                </div>
                                <p className={`text text_type_main-default ${productStyle.nameIngredient}`}>{item.name}</p>
                            </div>
                            {
                                // сам записал в файл с данными поля, по которым определяю отображение счетчика
                                item.count && <Counter count={item.count} size="default"/>
                            }
                        </li>
                    )
                )
            }
        </ul>
    );
}

Product.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
    ingredientType: PropTypes.string.isRequired 
};

export default Product;
