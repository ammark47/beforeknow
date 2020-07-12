export const searchAllWalmartProducts = async ( searchKey, abortSignal ) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_APIGATEWAY_URL}/walmart/products/${searchKey}`, { signal: abortSignal } )
        const listOfProductsJson = await response.json()
        console.log(listOfProductsJson)
        return listOfProductsJson["items"]
    } catch (error) {
        console.error(error)
    }
}

export const searchReviewedProducts = async ( searchKey ) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_APIGATEWAY_URL}/products?search=` + searchKey)
        const listOfProductsJson = await response.json()

        return listOfProductsJson
    } catch (error) {
        console.error(error)
    }
}