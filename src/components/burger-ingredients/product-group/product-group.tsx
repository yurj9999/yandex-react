import React, {FC, ReactElement} from 'react';

import {useSelector} from '../../../services/utils/modified-react-hooks';
import {Link, useLocation} from 'react-router-dom';

import Product from '../product/product';

import productGroup from './product-group.module.css';

interface IProductGroup {
    ingredientType: 'bun' | 'sauce' | 'main';
}

const ProductGroup: FC<IProductGroup> = ({ingredientType}): ReactElement => {
    const {ingredients} = useSelector(state => state.ingredients);

    const location = useLocation();

    return (
        <ul className={`pt-3 pb-3 pr-1 pl-2 ${productGroup.info}`}>
            {
                ingredients.map(item => item.type === ingredientType && 
                    (
                        <li data-cy="ingredient" key={item._id} className={productGroup.ingredientWrapper}>
                            <Link to={{
                                pathname: `/ingredients/${item._id}`,
                                state: {
                                    modal: location
                                }
                            }} className={productGroup.btn}>
                                <Product data={item}/>
                            </Link>
                        </li>
                    )
                )
            }
        </ul>
    );
}

export default React.memo(ProductGroup);
