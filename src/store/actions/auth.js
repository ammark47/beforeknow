export const USER_PROFILE_LOADED = 'USER_PROFILE_LOADED'
export const USER_LOGOUT = 'USER_LOGOUT'
export const POSTGRES_PROFILE_LOADED = 'POSTGRES_PROFILE_LOADED'
export const HANDLE_AUTHENTICATION_CALLBACK = 'HANDLE_AUTHENTICATION_CALLBACK'
export const ADD_REDIRECT_URL = 'ADD_REDIRECT_URL'

export function handleAuthenticationCallback(redirect) {
  return {
    type: HANDLE_AUTHENTICATION_CALLBACK,
    redirect
  }
} 

export const addRedirectUrl = (redirectPath) => {
  return {
    type: ADD_REDIRECT_URL,
    redirectPath
  }
} 

export const userLogoutAction = () => {
  return {
    type: USER_LOGOUT
  }
} 


