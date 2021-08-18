import {
    WS_CONNECT_ORDER_TAPE,
    WS_DISCONNECT_ORDER_TAPE,
    WS_CONNECT_USER_ORDERS,
    WS_DISCONNECT_USER_ORDERS
} from '../actions/index';

export const socketMiddleware = store => {
    let wssAllOrders = null;
    let wssMyOrders = null;

    return next => action => {
        const {dispatch} = store;

        switch(action.type) {
            case WS_CONNECT_ORDER_TAPE:
                if (wssAllOrders === null) {
                    wssAllOrders = new WebSocket(action.payload.url);
                    if (wssAllOrders) {
                        wssAllOrders.onmessage = event => {
                            if (event.data === 'ping') {
                                wssAllOrders.send('pong');
                            }
            
                            dispatch({
                                type: 'order-tape/setOrders',
                                payload: event.data
                            });
                        };
                    }
                }
                break;
            
            case WS_DISCONNECT_ORDER_TAPE:
                wssAllOrders.close();
                wssAllOrders = null;
                
                dispatch({
                    type: 'order-tape/clearOrders'
                });
                break;
    
            case WS_CONNECT_USER_ORDERS:
                if (wssMyOrders === null) {
                    wssMyOrders = new WebSocket(action.payload.url);
                    if (wssMyOrders) {
                        wssMyOrders.onmessage = event => {
                            if (event.data === 'ping') {
                                wssMyOrders.send('pong');
                            }
    
                            dispatch({
                                type: 'my-orders/setOrders',
                                payload: event.data
                            });
                        };
                    }
                }
                break;
    
            case WS_DISCONNECT_USER_ORDERS:
                wssMyOrders.close();
                wssMyOrders = null;
                
                dispatch({
                    type: 'my-orders/clearOrders'
                });
                break;
        }
        next(action);
    }
};
