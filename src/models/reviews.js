export const insertNewReview = async (review) => {
    const reviewCreateResponse = await fetch(`${process.env.REACT_APP_APIGATEWAY_URL}/reviews`, {
            method: 'POST',
            body: JSON.stringify(review),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    
    return reviewCreateResponse.status
}

export const getReviewersForProduct = async (productId) => {
    try {
        return await fetch(`${process.env.REACT_APP_APIGATEWAY_URL}/reviews/${productId}`, {
            method: 'GET'
        })
    } catch (error) {
        console.error(error)
    }
}

export const requestChat = async (customerId, reviewerId, reviewId) => {
    let chatExistsAlready = false
    let chatCurrencyNotEnough = false
    let serverError = false
    let isCustomerAndReviewerSame = false
    let success = false

    if (customerId === reviewerId) {
        isCustomerAndReviewerSame = true
    }

    const responseChatCurrency = await fetch(`${process.env.REACT_APP_APIGATEWAY_URL}/users/${customerId}/chat-currency`)
    const { chat_currency: chatCurrency } = await responseChatCurrency.json()

    if ( chatCurrency < 1 ){
        chatCurrencyNotEnough = true
    }

    const chatExistsResponse =  await fetch(`${process.env.REACT_APP_APIGATEWAY_URL}/chat/${reviewerId}/${customerId}/${reviewId}/pending-active`)
    const chatExists = await chatExistsResponse.json()

    if ( chatExists ){
        chatExistsAlready = true
    }

    if (!responseChatCurrency.ok || !chatExistsResponse.ok){
        serverError = true
    }

    if ( !chatCurrencyNotEnough && !chatExistsAlready && !isCustomerAndReviewerSame){
        const initiateChatResponse = await fetch(`${process.env.REACT_APP_APIGATEWAY_URL}/chat`, {
            method: 'POST',
            body: JSON.stringify({
                customerId,
                reviewerId,
                reviewId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }) 

        serverError = !initiateChatResponse.ok
    }


    return {
        chatCurrencyNotEnough,
        chatExistsAlready,
        serverError,
        isCustomerAndReviewerSame,
        chatCurrency
    }

        
}