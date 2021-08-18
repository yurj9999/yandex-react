export const getBurgerPrice = (ingredientIds, allIngredients) => {
    const costs = ingredientIds.map(id => id !== null ? allIngredients.find(item => item._id === id).price : null);
    return costs.reduce((prev, curr) => prev + curr, 0);
}
