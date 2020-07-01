import { Grid, makeStyles, TextField } from '@material-ui/core'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import { ReviewerProductCard } from 'components/ReviewerProductCard'
import React, { useState } from 'react'
import { useAsyncAbortable } from 'react-async-hook'
import ReactLoading from 'react-loading'
import useConstant from 'use-constant'
import { searchAllWalmartProducts } from '../models/product'


const styles = {
    searchBar: {
        marginTop: '3em',
    },
    results: {
        flexGrow: 1
    },
    title: {
        color: "#08415C",
        margin: "1.75rem 0 0.875rem",
        textDecoration: "underline",
        fontWeight: "500",
        fontFamily: `"Roboto Slab", "Times New Roman", serif`,
        marginBottom: "1rem",
        marginTop: "30px",         
    },
    fullWidth: {
        backgroundColor: "white"
    }
}

const useStyles = makeStyles(styles)

export const ReviewerSearchProducts = () => {
    const classes = useStyles()
    const [searchText, setSearchText] = useState('')
    const debouncedReviewerSearchProducts = useConstant(() => 
        AwesomeDebouncePromise(searchAllWalmartProducts, 300)
    )
    const { loading, error, result } = useAsyncAbortable( 
        async (abortSignal, searchText) => {
            if (searchText.length === 0) {
                return []
            } else {
                return debouncedReviewerSearchProducts(searchText, abortSignal)
            }
    } , [searchText])

    const handleChange = (e) => {
        e.preventDefault()
        setSearchText(e.target.value)
    }

    const placeholder = "What product would you like to submit a review for?..."
    const helperText = "We currently only support Walmart. Stay tuned for more stores soon!"

    return (
        <Grid container>
            <Grid container justify="center">
                <Grid item xs={12} sm={12} md={6}>
                    <TextField  
                        className={classes.searchBar} 
                        autoFocus fullWidth 
                        variant='outlined' 
                        onChange={handleChange} 
                        placeholder={placeholder}
                        helperText={helperText}
                    />
                </Grid>
                {searchText && 
                    <Grid item xs={12} align="left">
                        <h2 className={classes.title}>Search Results</h2>
                    </Grid>
                }
            </Grid>
            <Grid container justify="center" spacing={10} className={classes.results}>   
                    {loading && <ReactLoading type={"spinningBubbles"} color={"#08415C"} height={667} width={375} />}
                    {result && result.map(product => (
                        <ReviewerProductCard key={product.itemId} {...product} />
                    ))}
            </Grid>
        </Grid>
    )
}