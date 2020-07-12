import { checkAndInsertUser } from 'models/users';
import { call, put, spawn, takeLatest } from 'redux-saga/effects';
import { handleAuthentication } from '../../Auth0';
import { searchAllWalmartProducts, searchReviewedProducts } from '../../models/product';
import { HANDLE_AUTHENTICATION_CALLBACK, POSTGRES_PROFILE_LOADED, USER_PROFILE_LOADED } from '../actions/auth';
import { SEARCH_PRODUCT_REQUEST, SEARCH_PRODUCT_SUCCESS, SEARCH_REVIEWED_PRODUCT_REQUEST, SEARCH_REVIEWED_PRODUCT_SUCCESS } from '../actions/products';
import ReactGA from 'react-ga'



//--------------------------- Callbacks ------------------------------------------------------ //

export function* parseHash() {
    const user = yield call(handleAuthentication)
    yield put({ type: USER_PROFILE_LOADED, user })

    const userInfoPostgres = yield call(checkAndInsertUser, user)
    yield put({ type: POSTGRES_PROFILE_LOADED, userInfoPostgres })

    ReactGA.set({
        userId: user.profile.sub
    })
}

export function* fetchProductSearch(action) {
    try {
        const allProductsFromWalmart = yield call(searchAllWalmartProducts, action.searchKey)
        yield put({ type: SEARCH_PRODUCT_SUCCESS, allProducts: allProductsFromWalmart})
    } catch (err) {
        console.error(err)
    }
}

export function* fetchReviewedProducts(action) {
    try {
        const reviewedProducts = yield call(searchReviewedProducts, action.searchKey)
        yield put({ type: SEARCH_REVIEWED_PRODUCT_SUCCESS, reviewedProducts })
        console.log(reviewedProducts)
    } catch (err) {
        console.error(err)
    }
}

//--------------------------- Route Callbacks ------------------------------------------------------ //


export function* handleAuthenticationCallback() {
    yield takeLatest(HANDLE_AUTHENTICATION_CALLBACK, parseHash);
}

export function* handleSearchRequest() {
    yield takeLatest(SEARCH_PRODUCT_REQUEST, fetchProductSearch)
}

export function* handleSearchReviewedProductRequest() {
    yield takeLatest(SEARCH_REVIEWED_PRODUCT_REQUEST, fetchReviewedProducts)
}


//--------------------------- Root Saga ------------------------------------------------------ //

export default function* rootSaga() {
    yield spawn(handleAuthenticationCallback)
    yield spawn(handleSearchRequest)
    yield spawn(handleSearchReviewedProductRequest)

}
