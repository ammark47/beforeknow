import { Grid, makeStyles } from '@material-ui/core'
import { ReviewerNavTabs } from 'components/ReviewerNavTabs'
import React from 'react'
import { useParams } from 'react-router-dom'

const styles = {
    titleContainer: {
        marginTop: '3em'  
    },
    title: {
        color: "#08415C",
        margin: "1.75rem 0 0.875rem",
        textDecoration: "none",
        fontWeight: "700",
        fontFamily: `"Roboto Slab", "Times New Roman", serif`,        
    }
}

const useStyles = makeStyles(styles)

export const Reviewer = () => {
    const classes = useStyles()
    const { path } = useParams()

    return (
        <Grid item container align="center">
            <Grid item xs={12} className={classes.titleContainer}>
                <h2 className={classes.title}>Reviewer</h2>
            </Grid>
            <ReviewerNavTabs path={path}/>
        </Grid>
    )
}