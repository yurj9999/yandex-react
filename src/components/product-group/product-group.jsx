import PropTypes from 'prop-types';

import Product from '../product/product';

import productGroup from './product-group.module.css';

const ProductGroup = ({ ingredients, ingredientType, onProductClick }) => {  
    return (
        <ul className={`pt-3 pb-3 pr-1 pl-2 ${productGroup.info}`}>
            {
                ingredients.map(item => item.type === ingredientType && 
                    (
                        <li key={item._id} className={productGroup.ingredientWrapper}>
                            <Product data={item} onElementClick={onProductClick}/>
                        </li>
                    )
                )
            }
        </ul>
    );
}

ProductGroup.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
    ingredientType: PropTypes.string.isRequired,
    onProductClick: PropTypes.func.isRequired
};

export default ProductGroup;
