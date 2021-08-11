export const getOrdersStatuses = (orders) => {
    const result = {
        done: [],
        inWork: []
    };

    orders.forEach(item => {
        switch(item.status) {
            case 'done':
                result.done.push(item.number)
                break;

            case 'pending':
                result.inWork.push(item.number);
                break;
        }
    });

    return result;
};
