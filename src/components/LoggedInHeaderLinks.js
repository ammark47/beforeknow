// @material-ui/core components
import { List, ListItem } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import { ExitToAppSharp } from "@material-ui/icons";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import Button from "custom_components/CustomButtons/Button.js";
import React from "react";
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(styles);

export const LoggedInHeaderLinks = (props) => {
    const classes = useStyles()
    const history = useHistory()

    const handleCustomerLink = () => {
        history.push('/customers')
    }

    const handleReviewerLink = () => {
        history.push('/reviewers')
    }

    const handleLogOut = (e) => {
        e.preventDefault()
        history.replace('/')
        props.logOut()
    }

    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Button
                    onClick={handleCustomerLink}
                    color="transparent"
                    className={classes.navLink}
                >
                Customer
                </Button>
            </ListItem>

            <ListItem className={classes.listItem}>
                <Button
                onClick={handleReviewerLink}
                color="transparent"
                className={classes.navLink}
                >
                Reviewer
                </Button>
            </ListItem>

            <ListItem className={classes.listItem}>
                <Button
                    onClick={handleLogOut}
                    color="transparent"
                    className={classes.navLink}
                >
                <ExitToAppSharp className={classes.icons} /> Log Out
                </Button>
            </ListItem>
        </List>
    );
}
