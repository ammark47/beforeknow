import React from "react"
import { ReviewerListItem } from './ReviewerListItem1'
import { useParams } from "react-router-dom"
import useFetch from 'use-http'
import { LoadingIndicator } from "stream-chat-react"

export const ReviewerList = ( ) => {
    const { productId } = useParams()
    const { loading, data = [] } = useFetch("/api/reviews/" + productId, [])

    return (
        <>
            {loading && <LoadingIndicator />}
            {data && data.map(review => 
                <ReviewerListItem {...review} key={review.id} />
            )}
        </>
    )
}