import {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useDrag, useDrop} from 'react-dnd';

import PropTypes from 'prop-types';

import {DELETE_INGREDIENT, UPDATE_FILLINGS} from '../../services/constants';

import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import fillingStyle from './burger-filling.module.css';

const BurgerFilling = ({index, element}) => {

    const ref = useRef(null);
    const dispatch = useDispatch();
    const {fillings} = useSelector(store => store.constructorIngredients);

    const deleteIngedient = (index) => {
        dispatch({
            type: DELETE_INGREDIENT,
            elements: fillings.filter((item, number) => number !== index)
        });
    }

    const moveCard = ({indexDrag}, {indexDrop}) => {
        const temp = [...fillings];

        temp[indexDrag] = fillings.find((item, index) => index === indexDrop);
        temp[indexDrop] = fillings.find((item, index) => index === indexDrag);

        dispatch({
            type: UPDATE_FILLINGS,
            data: temp
        });
    };

    const [, dragRef] = useDrag({
        type: 'fillings',
        item: {
            indexDrag: index
        }
    });

    const [{isTarget}, dropRef] = useDrop({
        accept: 'fillings',
        collect: monitor => ({
            isTarget: monitor.isOver()
        }),
        drop(item, monitor) {
            const dragIndex = item.indexDrag;
            const hoverIndex = index;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();
            const hoverMiddleY = hoverBoundingRect.bottom - hoverBoundingRect.top;
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            
            if (!ref.current || dragIndex === hoverIndex ||
                (dragIndex < hoverIndex && hoverClientY === hoverMiddleY) ||
                    (dragIndex > hoverIndex && hoverClientY === hoverMiddleY)) {
                return;
            }

            moveCard(item, {
                indexDrop: index
            });
        }
    });

    dragRef(dropRef(ref));

    return (
        <div ref={ref} className={`mb-2 ${fillingStyle.fillingIngredient} ${isTarget && fillingStyle.target}`}>
            <ConstructorElement 
                handleClose={() => deleteIngedient(index)}
                thumbnail={element.image_mobile}
                text={element.name}
                price={element.price}
                isLocked={false}/>
            <DragIcon type="primary"/>
        </div>
    );
}

BurgerFilling.propTypes = {
    index: PropTypes.number.isRequired,
    element: PropTypes.object.isRequired
};

export default BurgerFilling;
