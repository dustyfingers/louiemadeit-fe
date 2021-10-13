import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import PageNotFound  from './404'

const ProtectedRoute = ({ component: Component, user, redirectTo, adminOnly, dispatch, ...rest }) => {
    return (
        <Route {...rest} 
            render={ props => {
                if (adminOnly) {
                    if (user && user.isAdmin) return <Component {...rest} {...props} />
                    else return <PageNotFound />
                } else {
                    if (user) return <Component {...rest} {...props} />
                    else return <PageNotFound />
                }
            }
            }
        />
    )
}

export default connect()(ProtectedRoute);