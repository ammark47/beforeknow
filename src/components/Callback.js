import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { handleAuthenticationCallback } from '../store/actions/auth';
import { useSelector } from 'react-redux'


export const Callback = () => {
  const userLoggedIn = useSelector(state => state.authReducer.loggedIn)
  const dispatch = useDispatch()
  const { redirect } = useSelector(state => state.authReducer)

  if (userLoggedIn) return <Redirect to={redirect} />
  dispatch(handleAuthenticationCallback())

  return <div className="text-center">Loading user profile.</div>;
}
