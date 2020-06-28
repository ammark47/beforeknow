import React from "react"
import { useParams } from "react-router-dom"
import { LoadingIndicator } from "stream-chat-react"
import useFetch from 'use-http'
import { ReviewerListItem } from './ReviewerListItem1'

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