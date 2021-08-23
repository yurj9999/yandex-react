import {IIngredient} from '../../interfaces';

interface ITemp {
    id: string;
    count: number;
}

interface IResult extends ITemp {
    name: string;
    price: number;
    image_mobile: string;
}

export const getBurgerIngredients = (ingredientIds: string[], allIngedients: IIngredient[]): IResult[] => {
    const temp: ITemp[] = [];

    ingredientIds.forEach(item => {
        const count = ingredientIds.filter(element => element === item).length;

        if (!temp.find(ingredient => ingredient?.id === item)) {
            temp.push({
                id: item,
                count
            });
        }
    });

    return temp.map(item => {
        const {name, price, image_mobile} = allIngedients.find(ingredient => ingredient._id === item.id) as IIngredient;

        return {
            ...item,
            name,
            price,
            image_mobile
        }
    });
}
