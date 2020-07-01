import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import Button from 'custom_components/CustomButtons/Button'
import Image from 'material-ui-image'
import { insertNewReview } from 'models/reviews'
import { Radios, TextField } from 'mui-rff'
import { useSnackbar } from 'notistack'
import React from 'react'
import { Form } from 'react-final-form'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },
    rootContainer: {
        marginTop: '10em',
        boxShadow:"0 0 0 0 #08415C, 0 0 0 0 #08415C, 0 1px 5px 0 #08415C",
        flexGrow: 1
    },
    description: {
        color: '#08415C',
        height: 'fit-content'
    },
    reviewFormContainer: {
        height: 'auto',
    },
    reviewForm: {
        margin: '4em'
    },
    innerReviewForm: {
        padding: '1em'
    },
    formButtom: {
        boxShadow:"0 2px 2px 0 #F56476, 0 3px 1px -2px #F56476, 0 1px 5px 0 #F56476",
        "&:hover,&:focus": {
            backgroundColor: "#F56476",
            boxShadow:
                "0 14px 26px -12px #F56476, 0 4px 23px 0px #F56476, 0 8px 10px -5px #F56476"
            },
        backgroundColor: '#08415C'
    }
}))

export const ReviewerCreateReview = () => {
    const classes = useStyles()
    const history = useHistory()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const productToReview = useSelector(state => state.searchProductsReducer.productToReview)
    const user = useSelector(state => state.authReducer.postgres_user)
    
    const onSubmit = async values => {
        const anchorOrigin = {
            vertical: 'top',
            horizontal: 'center',
        }
        let action = key => (
            <>
                <Button onClick={() => { history.push('/reviewers/pending') }}>
                    Check Pending Chats
                </Button>
            </>
        )

        if ( !('rating' in values) || !('review' in values)) {
            enqueueSnackbar(`You must enter values for both rating and reviews.`, {
                anchorOrigin: anchorOrigin,
                variant: 'error',
                autoHideDuration: 2000
            })

            return
        }

        const formValues = {...values, product: productToReview, userId: user.id}

        const insertReviewResponseStatus = await insertNewReview(formValues)
        let variant 
        let message

        switch(insertReviewResponseStatus) {
            case 403:
                variant = 'error'
                message = 'You have already submitted a review for this product. Check pending chats to see if anyone has sent a request'
                break
            case 500:
                variant = 'error'
                message = "Network Error. Please try again later"
                break
            case 200:
                variant = 'success'
                message = `Congrats, you have successfully submitted a review! While you wait, check if you have any pending chat requests` 
                break
            default:
                variant = 'error'
                message = 'Error'       
        }

        enqueueSnackbar(message, {
            anchorOrigin: anchorOrigin,
            variant: variant,
            autoHideDuration: 3500,
            action
        })
    }

    
    return (
        <Grid container justify="center">
            <Grid item container xs={12} md={10} spacing={10} className={classes.rootContainer}>
                <Grid item xs={12} md={5}>
                  <Image src={productToReview.mediumImage} />
                </Grid>
                <Grid item container xs={12} md={7} className={classes.root} direction="row">
                    <Grid item xs={12} className={classes.description}> 
                            <>
                                <Typography variant='h5' gutterBottom>{productToReview.name}</Typography>
                                <Typography variant='body1'>Walmart Id: {productToReview.itemId}</Typography>
                            </>
                    </Grid>
                    <Grid item xs={12} className={classes.reviewFormContainer}>
                        <Paper elevation={3} >
                            <Form
                                className={classes.reviewForm}
                                onSubmit={onSubmit}
                                render={({ handleSubmit, form, submitting, pristine, values }) => (
                                    <Grid container className={classes.innerReviewForm}>
                                        <form onSubmit={handleSubmit}>
                                            <Grid item container xs={12} spacing={3}>
                                                <Grid item xs={12}>
                                                <Radios
                                                    label="What would you rate this product?"
                                                    name="rating"
                                                    required={true}
                                                    formControlProps={{ margin: 'none' }}
                                                    radioGroupProps={{ row: true }}
                                                    data={[
                                                        { label: '1', value: '1' },
                                                        { label: '2', value: '2' },
                                                        { label: '3', value: '3' },
                                                        { label: '4', value: '4' },
                                                        { label: '5', value: '5' },
                                                    ]}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required={true}
                                                        id="review"
                                                        name="review"
                                                        label="Type your review here..."
                                                        multiline
                                                        fullWidth
                                                        rows={4}
                                                        variant="outlined"
                                                        inputProps={{maxLength : 400}}
                                                    />
                                                </Grid>
                                                <Grid item className="buttons">
                                                    <Button
                                                        className={classes.formButtom}
                                                        color="danger"
                                                        size="lg"
                                                        onClick={handleSubmit}
                                                    >
                                                    Submit Review
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Grid>
                                )}
                                />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}