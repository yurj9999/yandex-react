import {useMemo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useDrag} from 'react-dnd';

import PropTypes from 'prop-types';

import {MAX_BUNS_COUNT, SET_MODAL_INGREDIENT} from '../../services/constants';

import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

import productStyle from './product.module.css';

const Product = ({data}) => {
    const dispatch = useDispatch();

    const {blockedClick} = useSelector(store => store.modal);
    const {bun, fillings} = useSelector(store => store.constructorIngredients);
    
    const counter = useMemo(() => {
        if (bun._id === data._id) return MAX_BUNS_COUNT;

        return fillings.filter(element => element._id === data._id).length;
    }, [bun, fillings, data._id]);

    const [, dragRef] = useDrag({
        type: data.type,
        item: {
            id: data._id,
            type: data.type
        }
    });

    const setIngredientInfo = useCallback(() => {
        dispatch({
            type: SET_MODAL_INGREDIENT,
            ingredient: data
        });
    }, [data, dispatch]);

    return (
        <>
            <div ref={dragRef} className={productStyle.ingredient} onClick={blockedClick ? () => {} : setIngredientInfo}>
                <img alt="ingredient" className="mb-1" src={data.image}/>
                <div className={productStyle.costWrapper}>
                    <p className="text text_type_digits-default mr-1 mb-1">{data.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={`text text_type_main-default ${productStyle.nameIngredient}`}>{data.name}</p>
            </div>
            {
                counter ? <Counter count={counter} size="default"/> : null
            }
        </>
    );
}

Product.propTypes = {
    data: PropTypes.object.isRequired
};

export default Product;
