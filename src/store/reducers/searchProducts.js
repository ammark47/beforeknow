import {
    ADD_PRODUCT_TO_REVIEW_CART, SEARCH_PRODUCT_REQUEST,
    SEARCH_PRODUCT_SUCCESS,
    SEARCH_REVIEWED_PRODUCT_REQUEST,
    SEARCH_REVIEWED_PRODUCT_SUCCESS
} from "../actions/products"

const initialState = {
    loadingProducts: false,
    loadingReviewProducts: false
}

export const searchProductsReducer = ( state = initialState, action) => {
    switch (action.type) {
        case SEARCH_PRODUCT_REQUEST:
            return {
                ...state,
                loadingProducts: true
            }
        case SEARCH_PRODUCT_SUCCESS:
            return {
                ...state,
                loadingProducts: false,
                allProducts: action.allProducts
            }
        case SEARCH_REVIEWED_PRODUCT_REQUEST:
            return {
                ...state,
                loadingReviewProducts: true
            }
        case SEARCH_REVIEWED_PRODUCT_SUCCESS:
            return {
                ...state,
                loadingReviewProducts: false,
                reviewedProducts: action.reviewedProducts
            }
        case ADD_PRODUCT_TO_REVIEW_CART:
            return {
                ...state,
                productToReview: action.productToReview
            }
        default:
            return state
    }
}