import {ReactNode, useEffect, useState, FC, ReactElement} from 'react';
import {useDispatch} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import {actions as userActions} from '../../services/slices/user';
import {refreshTokenUpdater} from '../../services/utils/refresh-token-updater';

interface IProtectedRoute {
    children: ReactNode;
    path: string;
    protectType: 'nonAuthorized' | 'authorized';
    exact?: boolean;
}

interface IRoutes {
    nonAuthorized: JSX.Element;
    authorized: JSX.Element;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({children, path, protectType}): ReactElement | null => {
    const dispatch = useDispatch();

    const {setUpdatedTokens} = userActions;
    const refreshToken = localStorage.getItem('burgerRefreshToken');

    const [routeData, setRouteData] = useState({
        isTokenValid: false,
        routeType: 'none'
    });

    const {isTokenValid, routeType} = routeData;

    const protectedRoutes: IRoutes = {
        nonAuthorized: <Route path={path} render={
            ({location}) => (isTokenValid || refreshToken) ? children : <Redirect to={
                {
                    pathname: '/login',
                    state: {
                        from: location
                    } 
                }
            }/>
        }/>,

        authorized: <Route path={path} render={
            () => (isTokenValid || refreshToken) ? <Redirect to="/"/> : children
        }/>
    };

    useEffect(() => {
        if (routeType === 'none') {
            refreshTokenUpdater(dispatch, setUpdatedTokens)
                .then(result => setRouteData({
                    isTokenValid: result.success,
                    routeType: protectType
                }))
                .catch(() => setRouteData({
                    isTokenValid: false,
                    routeType: protectType
                }))
        }
    }, [dispatch, setUpdatedTokens, protectType, routeType]);

    return routeType === 'none' ? null : protectedRoutes[protectType];
}
