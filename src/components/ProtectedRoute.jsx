import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, user, redirectTo, adminOnly, ...rest }) => {
    return (
        <Route {...rest} render={
            props => {
                if (adminOnly) {
                    if (user && user.isAdmin) return <Component {...rest} {...props} />
                    else {
                        return <Redirect to={
                        {
                            pathname: redirectTo,
                            state: {
                                from: props.location
                            }
                        }
                        } />
                    }
                } else {
                    if (user) return <Component {...rest} {...props} />
                    else {
                        return <Redirect to={
                        {
                            pathname: redirectTo,
                            state: {
                                from: props.location
                            }
                        }
                        } />
                    }
                }
            }
        } />
    )
}

export default ProtectedRoute;