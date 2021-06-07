import React from 'react';
import {useSelector} from 'react-redux';

import PropTypes from 'prop-types';

import Product from '../product/product';

import productGroup from './product-group.module.css';

const ProductGroup = ({ingredientType}) => {
    const {ingredients} = useSelector(state => state.ingredients);

    return (
        <ul className={`pt-3 pb-3 pr-1 pl-2 ${productGroup.info}`}>
            {
                ingredients.map(item => item.type === ingredientType && 
                    (
                        <li key={item._id} className={productGroup.ingredientWrapper}>
                            <Product data={item}/>
                        </li>
                    )
                )
            }
        </ul>
    );
}

ProductGroup.propTypes = {
    ingredientType: PropTypes.string.isRequired
};

export default React.memo(ProductGroup);
