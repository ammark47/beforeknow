export const acceptChat = async (reviewer, customerId, reviewId, customerName) => {
    const response = await fetch(`/api/chat/accept/${reviewer.id}/${customerId}/${reviewId}`, {
            method: 'PATCH',
            body: JSON.stringify({...reviewer, customerName}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
    
    return response.ok
}

export const declineChat = async (reviewerId, customerId, reviewId) => {
    const response = await fetch(`/api/chat/decline/${reviewerId}/${customerId}/${reviewId}`, {
            method: 'PATCH'
        })
    
    return response.ok
}

export const checkPendingChats = (userId) => 
    new Promise((resolve, reject) => {
        fetch(`/api/chat/${userId}`)
        .then(response => response.json())
        .then(result =>{
            resolve({
                data: result,
                page: 1,
                totalCount: result.length
            })
        })
    })
