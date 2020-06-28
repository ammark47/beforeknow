import Header from 'custom_components/Header/Header';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from 'store/configueStore';
import { logIn, signOut } from '../Auth0';
import { userLogoutAction } from '../store/actions/auth';
import { LoggedInHeaderLinks } from './LoggedInHeaderLinks';
import { LoggedOutHeaderLinks } from './LoggedOutHeaderLinks';



export default () => {
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.authReducer.loggedIn)
  const user = useSelector(state => state.authReducer.user)

  const handleLogOut = async () => {
    signOut()
    await persistor.purge()
    dispatch(userLogoutAction())
  }

  const HeaderLinks = !loggedIn ? <LoggedOutHeaderLinks  logIn={logIn} /> : <LoggedInHeaderLinks logOut={handleLogOut} />

  
  return (
    <>
      <Header 
        brand="Before Know"
        color="custom"
        fixed
        rightLinks={HeaderLinks}
        changeColorOnScroll={{
          height: 400,
          color: "rose"
        }} />

    </>
  )
}