import { Grid } from '@material-ui/core'
import { ReviewerNavTabs } from 'components/ReviewerNavTabs'
import React from 'react'
import { useParams } from 'react-router-dom'


export const Reviewer = () => {
    const { path } = useParams()

    return (
        <Grid item container justify="center">
            <ReviewerNavTabs path={path}/>
        </Grid>
    )
}