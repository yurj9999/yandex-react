export const fillMaxList = (orderArray) => {
    const result = [];
    const temp = [];

    orderArray.forEach((item, index) => {
        temp.push(item);
        
        if (temp.length === 10 || index + 1 === orderArray.length) {
            result.push([...temp]);
            temp.length = 0;
        }
    });

    return result;
}
