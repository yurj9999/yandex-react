import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import detailsStyle from './ingredient-details.module.css';

const IngredientDetails = () => {
    const {id} = useParams();

    const {ingredients} = useSelector(store => store.ingredients);
    const ingredient = ingredients.find(item => item._id === id);

    return (
        ingredient && Object.keys(ingredient).length ? (
            <div className={detailsStyle.wrapper}>
                <p className={`text text_type_main-large ${detailsStyle.title}`}>Детали ингредиента</p>    
                <div className={detailsStyle.main}>
                    <img alt="bun" src={ingredient.image_large} className={`mb-2 ${detailsStyle.image}`}/>
                    <div className={`text text_type_main-medium ${detailsStyle.name}`}>{ingredient.name}</div>
                    <div className={`text text_type_main-default ${detailsStyle.details}`}>Превосходные котлеты из марсианской Магнолии для фирменных космических бургеров, набирающих популярность по всей вселенной.</div>
                    <div className={detailsStyle.infoWrapper}>
                        <div className={detailsStyle.infoElement}>
                            <p className="text text_type_main-default">Калории, ккал</p>
                            <p className="text text_type_digits-default pt-1">{ingredient.calories}</p>
                        </div>
                        <div className={detailsStyle.infoElement}>
                            <p className="text text_type_main-default">Белки, г</p>
                            <p className="text text_type_digits-default pt-1">{ingredient.proteins}</p>
                        </div>
                        <div className={detailsStyle.infoElement}>
                            <p className="text text_type_main-default">Жиры, г</p>
                            <p className="text text_type_digits-default pt-1">{ingredient.fat}</p>
                        </div>
                        <div className={detailsStyle.infoElement}>
                            <p className="text text_type_main-default">Углеводы, г</p>
                            <p className="text text_type_digits-default pt-1">{ingredient.carbohydrates}</p>
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    );
}

export default IngredientDetails;
