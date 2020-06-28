import { Grid, makeStyles, TextField } from '@material-ui/core'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import React, { useState } from 'react'
import { useAsync } from 'react-async-hook'
import ReactLoading from 'react-loading'
import useConstant from 'use-constant'
import { searchReviewedProducts } from '../models/product'
import { CustomerProductCard } from './CustomerProductCard'


const styles = {
    searchBar: {
        backgroundColor: 'white',
        marginTop: '5em',
    },
    results: {
        marginTop: '2em',
        flexGrow: 1
    }
}

const useStyles = makeStyles(styles)

export const CustomerSearchProducts = () => {
    const classes = useStyles()
    const [searchText, setSearchText] = useState('')
    const debouncedCustomerSearchProducts = useConstant(() => 
        AwesomeDebouncePromise(searchReviewedProducts, 300)
    )
    const { loading, error, result } = useAsync(debouncedCustomerSearchProducts, [searchText])

    const handleChange = (e) => {
        e.preventDefault()
        setSearchText(e.target.value)
    }

    return (
        <Grid container>
            <Grid container justify="center">
                <Grid item xs={12} sm={12} md={6}>
                    <TextField  className={classes.searchBar} fullWidth variant='outlined' onChange={handleChange} />
                </Grid>
            </Grid>
            <Grid container justify="center" spacing={10} className={classes.results}>   
                    {loading && <ReactLoading type={"spinningBubbles"} color={"#08415C"} height={667} width={375} />}
                    {result && result.map(product => (
                        <CustomerProductCard key={product.id} {...product} />
                    ))}
            </Grid>
        </Grid>
    )
}