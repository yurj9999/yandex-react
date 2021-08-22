import {IIngredient} from '../../interfaces';

export const getBurgerPrice = (ingredientIds: string[], allIngredients: IIngredient[]): number => {
    const costs = ingredientIds.map(id => id !== null ? allIngredients.find(item => item._id === id)?.price : null);
    return (costs as number[]).reduce((prev, curr) => prev + curr, 0);
}
