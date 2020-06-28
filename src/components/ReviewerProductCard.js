import { Card, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addProductReviewCart } from '../store/actions/products'


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

export const ReviewerProductCard = (product) => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const {
        mediumImage,
        name,
        itemId
    } = product

    const handleClick = () => {
        history.push(`/reviewers/products/review/`)
        dispatch(addProductReviewCart({ 
            mediumImage,
            name,
            itemId
        }))
    }

    return (
        <Grid item xs={12} sm={12} md={3} >
            <Card className={classes.root} onClick={handleClick}>
                <CardMedia className={classes.media} image={mediumImage}/>
                <CardContent className={classes.cardText}>
                    <Typography variant='subtitle1'>
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {itemId}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}