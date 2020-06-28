import { combineReducers } from 'redux'
import { USER_LOGOUT } from 'store/actions/auth'
import { authReducer } from './auth'
import { searchProductsReducer } from './searchProducts'

const appReducer = combineReducers({
    authReducer,
    searchProductsReducer
})

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer