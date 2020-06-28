import { Card, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        borderRadius: 0,
    },
    media: {
        height: 300,
    },
    cardText: {
        backgroundColor: "rgb(215, 253, 236)",
        '&:hover': {
            boxShadow: '0px 2px 6px -1px rgba(0,0,0,0.2) 0px 2px 6px 0px rgba(0,0,0,0.14) 0px 2px 6px 0px rgba(0,0,0,0.12)',
            backgroundColor: '#08415C',
            color: 'white'
        }
    }
})

export const CustomerProductCard = (product) => {
    const classes = useStyles()
    const history = useHistory()
    const {
        small_image,
        product_name,
        store_item_id
    } = product

    const handleClick = () => {
        history.push(`/customers/products/${product.id}`)
    }

    return (
        <Grid item xs={12} sm={12} md={3} >
            <Card className={classes.root} onClick={handleClick}>
                <CardMedia className={classes.media} image={small_image}/>
                <CardContent className={classes.cardText}>
                    <Typography variant='subtitle1'>
                        {product_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {store_item_id}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}