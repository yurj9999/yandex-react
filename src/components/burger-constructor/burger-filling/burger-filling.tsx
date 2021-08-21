import {useRef, useCallback, FC, ReactElement} from 'react';
import {useDispatch, useSelector} from '../../../services/utils/modified-react-hooks';
import {useDrag, useDrop} from 'react-dnd';

import {actions as constructorActions} from '../../../services/slices/constructor';

import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import {IIngredient} from '../../../interfaces';

import fillingStyle from './burger-filling.module.css';

interface IBurgerFilling {
    element: IIngredient;
    index: number;
}

interface IDrop {
    indexDrag: number;
}

const BurgerFilling: FC<IBurgerFilling> = ({index, element}): ReactElement => {
    const dispatch = useDispatch();

    const {deleteIngredient, updateFillings} = constructorActions;

    const {fillings} = useSelector(store => store.constructorIngredients);
    
    const ref = useRef<HTMLDivElement>(null);

    const del = useCallback((index) => dispatch(deleteIngredient(fillings.filter((item, number) => number !== index))), [dispatch, fillings, deleteIngredient]);

    const moveCard = useCallback(({indexDrag}, {indexDrop}) => {
        const temp = [...fillings];

        temp[indexDrag] = fillings.find((item, index) => index === indexDrop) as IIngredient;
        temp[indexDrop] = fillings.find((item, index) => index === indexDrag) as IIngredient;

        dispatch(updateFillings(temp));
    }, [dispatch, fillings, updateFillings]);

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
        drop(item: IDrop, monitor) {
            const dragIndex = item.indexDrag;
            const hoverIndex = index;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();
            const hoverMiddleY = hoverBoundingRect && (hoverBoundingRect.bottom - hoverBoundingRect.top);
            const hoverClientY = clientOffset && hoverBoundingRect && (clientOffset.y - hoverBoundingRect.top);
            
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
                handleClose={() => del(index)}
                thumbnail={element.image_mobile}
                text={element.name}
                price={element.price}
                isLocked={false}/>
            <DragIcon type="primary"/>
        </div>
    );
}

export default BurgerFilling;
