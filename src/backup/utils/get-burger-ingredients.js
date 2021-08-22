export const getBurgerIngredients = (ingredientIds, allIngedients) => {
    const temp = [];

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
        const {name, price, image_mobile} = allIngedients.find(ingredient => ingredient._id === item.id);

        return {
            ...item,
            name,
            price,
            image_mobile
        }
    });
}
