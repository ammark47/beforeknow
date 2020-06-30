import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, useLocation } from 'react-router-dom'
import { logIn } from 'Auth0'
import { LogIn } from './LogIn'

export const ProtectedRoute = ({ children, callback, redirect, ...rest }) => {
    const loggedIn = useSelector(state => state.authReducer.loggedIn)
    const location = useLocation()

    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedIn || callback ? (
                    children 
                    ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
