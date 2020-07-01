import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Route, useLocation } from 'react-router-dom'
import { logIn } from 'Auth0'
import { addRedirectUrl } from 'store/actions/auth'

export const LogIn = () => {
    const loggedIn = useSelector(state => state.authReducer.loggedIn)
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        let { from } = location.state || { from: { pathname: "/" } }
        const { pathname } = from 

        dispatch(addRedirectUrl(pathname))

        if (!loggedIn) {
            logIn()
        }
    }, [location])
    

    return (
        <>
        </>
    )
}
