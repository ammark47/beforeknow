export const acceptChat = async (reviewer, customerId, reviewId, customerName, productName) => {
    const response = await fetch(`${process.env.REACT_APP_APIGATEWAY_URL}/chat/${reviewer.id}/${customerId}/${reviewId}/accept`, {
            method: 'PATCH',
            body: JSON.stringify({...reviewer, customerName, productName}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
    
    return response.ok
}

export const declineChat = async (reviewerId, customerId, reviewId) => {
    const response = await fetch(`${process.env.REACT_APP_APIGATEWAY_URL}/chat/${reviewerId}/${customerId}/${reviewId}/deline`, {
            method: 'PATCH'
        })
    
    return response.ok
}

export const checkPendingChats = (userId) => 
    new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_APIGATEWAY_URL}/chat/${userId}`)
        .then(response => response.json())
        .then(result =>{
            resolve({
                data: result,
                page: 1,
                totalCount: result.length
            })
        })
    })
