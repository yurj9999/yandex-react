import PropTypes from 'prop-types';

import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import {actions as userActions} from '../../services/slices/user';
import {refreshTokenUpdater} from '../../services/utils/refresh-token-updater';

export const ProtectedRoute = ({children, path, protectType}) => {
    const dispatch = useDispatch();

    const {setUpdatedTokens} = userActions;
    const refreshToken = localStorage.getItem('burgerRefreshToken');

    const [routeData, setRouteData] = useState({
        isTokenValid: false,
        routeType: 'none'
    });

    const {isTokenValid, routeType} = routeData;

    const protectedRoutes = {
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

    return (
        routeType === 'none' ? null : (
            protectedRoutes[protectType]
        )
    );
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired,
    protectType: PropTypes.string.isRequired
}
