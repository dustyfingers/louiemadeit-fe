import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ToastsStore } from 'react-toasts';

const ProtectedRoute = ({ component: Component, user, redirectTo, adminOnly, ...rest }) => {
    return (
        <Route {...rest} render={
            props => {
                console.log({userInProtectedRoute: user})
                if (adminOnly) {
                    if (user && user.isAdmin) return <Component {...rest} {...props} />
                    else {
                        ToastsStore.error('There was an error verifying your credentials.');
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
                        ToastsStore.error('There was an error verifying your credentials.');
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