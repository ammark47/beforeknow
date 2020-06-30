import { makeStyles } from "@material-ui/core/styles"
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js"
import GridContainer from 'custom_components/Grid/GridContainer'
import GridItem from 'custom_components/Grid/GridItem'
import React from 'react'
import { CustomerTimeLine } from './CustomerTimeLine'
import { ReviewerTimeLine } from './ReviewerTimeLine'
import { Grid } from '@material-ui/core';


const customStyles = {
    ...styles,
    subTitle: {
        ...styles.title,
        color: '#A9FBD7'
    }
}

const useStyles = makeStyles(customStyles)


export const HowItWorks = () => {
    const classes = useStyles()

    return (
        <div className={classes.section}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                    <h2 className={classes.title}>How It Works</h2>
                </GridItem>
            </GridContainer>
            <Grid container style={{ flexGrow: 1 }} spacing={10}>
                <Grid item xs={12} sm={12} md={6}>
                    <Grid container direction="column">
                        <GridItem xs={12}>
                            <h2 className={classes.subTitle}>Customer</h2>
                        </GridItem>
                        <GridItem xs={12}>
                            <CustomerTimeLine />      
                        </GridItem>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <GridContainer direction="column" >
                        <GridItem xs={12} >
                            <h2 className={classes.subTitle}>Reviewer</h2>
                        </GridItem>
                        <GridItem xs={12}>
                            <ReviewerTimeLine />      
                        </GridItem>
                    </GridContainer>
                </Grid>
            </Grid>
        </div>
    )
}