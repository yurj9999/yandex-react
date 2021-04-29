import PropTypes from 'prop-types';

import detailsStyle from './ingredient-details.module.css';

const IngredientDetails = ({data}) => {
    const {image_large, name, calories, proteins, fat, carbohydrates} = data;

    return (
        <div className={detailsStyle.wrapper}>
            <p className={`text text_type_main-large ${detailsStyle.title}`}>Детали ингредиента</p>    
            <div className={detailsStyle.main}>
                <img alt="bun" src={image_large} className={`mb-2 ${detailsStyle.image}`}/>
                <div className="text text_type_main-medium mb-4">{name}</div>

                {/*захардкоженный текст, так как с бэкенда не приходит детального описания*/}
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

IngredientDetails.propTypes = {
    data: PropTypes.object.isRequired
};

export default IngredientDetails;
