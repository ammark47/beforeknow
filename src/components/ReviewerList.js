import React from "react"
import { useParams } from "react-router-dom"
import { LoadingIndicator } from "stream-chat-react"
import useFetch from 'use-http'
import { ReviewerListItem } from './ReviewerListItem1'

export const ReviewerList = ( ) => {
    const { productId } = useParams()
    const { loading, data = [] } = useFetch(`${process.env.REACT_APP_APIGATEWAY_URL}/reviews/` + productId, [])

    return (
        <>
            {loading && <LoadingIndicator />}
            {data && data.map(review => 
                <ReviewerListItem {...review} key={review.id} />
            )}
        </>
    )
}