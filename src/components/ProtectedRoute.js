import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

export const ProtectedRoute = ({ children, callback, ...rest }) => {
    const loggedIn = useSelector(state => state.authReducer.loggedIn)

    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedIn || callback ? (
                    children 
                    ) : (
                    <Redirect
                        to={"/"}
                    />
                )
            }
        />
    );
}
