import { makeStyles } from "@material-ui/core/styles"
import styles from "assets/jss/material-kit-react/views/landingPage.js"
import clsx from 'clsx'
import Button from 'custom_components/CustomButtons/Button'
import GridContainer from 'custom_components/Grid/GridContainer'
import GridItem from 'custom_components/Grid/GridItem'
import Parallax from 'custom_components/Parallax/Parallax'
import React from 'react'
import { logIn } from '../Auth0'
import { HowItWorks } from './HowItWorks'


const customStyles = {
    ...styles,
    lpButton: {
        boxShadow:"0 2px 2px 0 #F56476, 0 3px 1px -2px #F56476, 0 1px 5px 0 #F56476",
        "&:hover,&:focus": {
            backgroundColor: "#F56476",
            boxShadow:
                "0 14px 26px -12px #F56476, 0 4px 23px 0px #F56476, 0 8px 10px -5px #F56476"
            },
        backgroundColor: '#08415C'
    },

} 

const useStyles = makeStyles(customStyles);


export const LandingPage = () => {
    const classes = useStyles()


    return (
        <>
                <Parallax filter image={require("../images/lp-banner.jpg")}>
                    <div className={classes.container}>
                        <GridContainer justify='flex-end'>
                            <GridItem xs={12} sm={12} md={6}>
                                <h1 className={classes.title}><span style={{ fontStyle: 'italic' }}>Know</span> the product</h1>
                                <h4>
                                    BeforeKnow facilitates real-time chats with people who brought the product.
                                    Ask reviewers the questions you need answered about that product you just 
                                    might buy. 
                                </h4>
                                <br />
                                <Button
                                    className={classes.lpButton}
                                    color="danger"
                                    size="lg"
                                    onClick={logIn}
                                >
                                    <i className="fas fa-play" />
                                    Get Started
                                </Button>
                            </GridItem>
                        </GridContainer>
                    </div>
                </Parallax>
                <div className={clsx(classes.main, classes.mainRaised)}>
                    <div className={classes.container}>
                        <HowItWorks />
                    </div>
                </div>
        </>
    )
}