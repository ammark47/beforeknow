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
    loading: {
        marginTop: "3em"
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

    const placeholder = "What product would you like to ask questions about?..."  
    const helperText = "We currently only support Walmart. Stay tuned for more stores soon!" 

    return (
        <Grid container justify="flex-start" >
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
            </Grid>
            {!searchText && 
                <Grid item xs={12} align="left">
                    <h2 className={classes.title}>Trending Products</h2>
                </Grid>
            }
            {searchText && 
                <Grid item xs={12} align="left">
                    <h2 className={classes.title}>Search Results</h2>
                </Grid>
            } 
            <Grid container justify="center" spacing={10} className={classes.results}>
                    {loading && <ReactLoading className={classes.loading} type={"spinningBubbles"} color={"#08415C"} height={667} width={375} />}
                    {result && result.map(product => (
                        <CustomerProductCard key={product.id} {...product} />
                    ))}
            </Grid>
        </Grid>
    )
}