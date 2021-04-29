import PropTypes from 'prop-types';

import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

import productStyle from './product.module.css';

const Product = ({ data, onElementClick }) => {
    return (
        <>
            <div className={productStyle.ingredient} onClick={() => onElementClick(data)}>
                <img alt="ingredient" className="mb-1" src={data.image}/>
                <div className={productStyle.costWrapper}>
                    <p className="text text_type_digits-default mr-1 mb-1">{data.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={`text text_type_main-default ${productStyle.nameIngredient}`}>{data.name}</p>
            </div>
            {
                data.count ? <Counter count={data.count} size="default"/> : null
            }
        </>
    );
}

Product.propTypes = {
    data: PropTypes.object.isRequired,
    onElementClick: PropTypes.func.isRequired
};

export default Product;
