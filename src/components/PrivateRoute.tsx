import * as React from 'react';
import {Redirect, Route, RouteProps,} from 'react-router-dom';
import PropTypes from "prop-types";

PrivateRoute.propTypes = {
    component: PropTypes.any,
    isLoggedIn: PropTypes.bool,
};

interface PrivateRouteProps extends RouteProps {
    component: any;
    isLoggedIn: boolean;
}

export default function PrivateRoute(props: PrivateRouteProps) {
    const {component, isLoggedIn, ...rest} = props;

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                isLoggedIn ? (
                    component
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: {from: routeProps.location}
                        }}
                    />
                )
            }
        />
    )
}