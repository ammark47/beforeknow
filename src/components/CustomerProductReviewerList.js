import { Grid, makeStyles, Typography } from '@material-ui/core'
import Image from 'material-ui-image'
import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from 'use-http'
import { ProductReviewerList } from './ProductReviewerList'

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },
    productContainer: {
        marginTop: '10em',
        boxShadow:"0 0 0 0 #08415C, 0 0 0 0 #08415C, 0 1px 5px 0 #08415C"
    },
    description: {
        color: '#08415C',
    }
}))

export const CustomerProductReviewerList = () => {
    const classes = useStyles()
    const { productId } = useParams()
    
    const { loading: productLoading, error: productError, data: productData } = useFetch(`${process.env.REACT_APP_APIGATEWAY_URL}/products/${productId}`, [])
    const { loading: reviewerLoading, error: reviewerError, data: reviewerData } = useFetch(`${process.env.REACT_APP_APIGATEWAY_URL}/reviews/${productId}`, [])


    return (
        <Grid container justify='center'>
            <Grid item container xs={12} sm={12} md={8} className={classes.productContainer} spacing={10}>
                <Grid item xs={12} md={5}>
                    {productData && <Image src={productData.small_image} /> }
                </Grid>
                <Grid item xs={12} md={5} className={classes.description}>
                    {productData && (
                        <>
                            <Typography variant='h5' gutterBottom>{productData.product_name}</Typography>
                            <Typography variant='body1'>Walmart Id: {productData.store_item_id}</Typography>
                        </>
                    )}
                </Grid>
            </Grid>
            {reviewerData && <ProductReviewerList reviewerList={reviewerData} />}
        </Grid>
    )
}