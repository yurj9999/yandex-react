import {useMemo, FC, ReactElement} from 'react';
import {useSelector} from '../../../services/utils/modified-react-hooks';
import {useDrag} from 'react-dnd';

import {MAX_BUNS_COUNT} from '../../../services/constants';

import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

import {IIngredient} from '../../../interfaces';

import productStyle from './product.module.css';

interface IProduct {
    data: IIngredient;
}

const Product: FC<IProduct> = ({data}): ReactElement => {
    const {bun, fillings} = useSelector(store => store.constructorIngredients);
    
    const counter = useMemo(() => {
        if ('_id' in bun && bun._id === data._id) return MAX_BUNS_COUNT;

        return fillings.filter(element => element._id === data._id).length;
    }, [bun, fillings, data._id]);

    const [, dragRef] = useDrag({
        type: data.type,
        item: {
            id: data._id,
            type: data.type
        }
    });

    return (
        <>
            <div data-qa="product-component" ref={dragRef} className={productStyle.ingredient}>
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

export default Product;
