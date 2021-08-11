export const getBurgerPrice = (ingredientIds, allIngredients) => {
    const costs = ingredientIds.map(id => allIngredients.find(item => item._id === id).price);
    return costs.reduce((prev, curr) => prev + curr, 0);
}
