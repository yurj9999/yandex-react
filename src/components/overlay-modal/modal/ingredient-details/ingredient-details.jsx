import {useParams} from 'react-router-dom';

import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {getIngredients} from '../../../../services/actions/index';

import detailsStyle from './ingredient-details.module.css';

const IngredientDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams();

    const {ingredients} = useSelector(store => store.ingredients);
    const [ingredient, setIngredient] = useState({});

    useEffect(() => {
        if (!ingredients.length) {
            dispatch(getIngredients());
        } else {
            setIngredient(ingredients.find(item => item._id === id));
        }
    }, [ingredients, dispatch, id]);

    const {image_large, name, calories, proteins, fat, carbohydrates} = ingredient;

    return (
        <div className={detailsStyle.wrapper}>
            <p className={`text text_type_main-large ${detailsStyle.title}`}>Детали ингредиента</p>    
            <div className={detailsStyle.main}>
                {image_large && <img alt="bun" src={image_large} className={`mb-2 ${detailsStyle.image}`}/>}
                <div className={`text text_type_main-medium ${detailsStyle.name}`}>{name}</div>

                <div className={`text text_type_main-default ${detailsStyle.details}`}>Превосходные котлеты из марсианской Магнолии для фирменных космических бургеров, набирающих популярность по всей вселенной.</div>
                <div className={detailsStyle.infoWrapper}>
                    <div className={detailsStyle.infoElement}>
                        <p className="text text_type_main-default">Калории, ккал</p>
                        <p className="text text_type_digits-default pt-1">{calories}</p>
                    </div>
                    <div className={detailsStyle.infoElement}>
                        <p className="text text_type_main-default">Белки, г</p>
                        <p className="text text_type_digits-default pt-1">{proteins}</p>
                    </div>
                    <div className={detailsStyle.infoElement}>
                        <p className="text text_type_main-default">Жиры, г</p>
                        <p className="text text_type_digits-default pt-1">{fat}</p>
                    </div>
                    <div className={detailsStyle.infoElement}>
                        <p className="text text_type_main-default">Углеводы, г</p>
                        <p className="text text_type_digits-default pt-1">{carbohydrates}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IngredientDetails;
