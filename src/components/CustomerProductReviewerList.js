import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import Image from 'material-ui-image'
import useFetch from 'use-http'
import ReactLoading from 'react-loading'
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
    const productId = 15
    const { loading: productLoading, error: productError, data: productData } = useFetch(`/db/products/${productId}`, [])
    const { loading: reviewerLoading, error: reviewerError, data: reviewerData } = useFetch(`/db/reviews/${productId}`, [])


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