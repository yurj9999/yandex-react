export const getOrdersStatuses = (orders) => {
    const result = {
        done: [],
        inWork: []
    };
    
    const done = orders.filter(item => item.status === 'done');
    const inWork = orders.filter(item => item.status === 'pending');

    const setMaxLength = (dataArray, resultArray) => {
        if (dataArray.length > 10) {
            for (let i = 0; i < 10; i++) {
                resultArray.push(dataArray[i].number);
            }
        } else {
            for (let i = 0; i !== dataArray.length; i++) {
                resultArray.push(dataArray[i].number);
            }
        }
    }

    setMaxLength(done, result.done);
    setMaxLength(inWork, result.inWork);

    return result;
};
