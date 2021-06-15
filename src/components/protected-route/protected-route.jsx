import {Route, Redirect} from 'react-router-dom';

import {getCookie} from '../../services/utils/cookie-helper';

export const ProtectedRoute = ({children, path, protectType}) => {
    const cookie = getCookie('burgerAccessToken');

    switch(protectType) {
        case 'nonAuthorized':
            return (
                <Route path={path} render={
                    () => cookie ? children : <Redirect to="/login"/>
                }/>
            );

        case 'authorized':
            return (
                <Route path={path} render={
                    () => cookie ? <Redirect to="/"/> : children
                }/>
            );

        default:
            return;
    }
}
