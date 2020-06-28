import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import { MeetingRoomSharp } from "@material-ui/icons";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import Button from "custom_components/CustomButtons/Button.js";
import React from "react";

const useStyles = makeStyles(styles);

export const LoggedOutHeaderLinks = (props) => {
    const classes = useStyles();
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Button
                onClick={props.logIn}
                color="transparent"
                className={classes.navLink}
                >
                <MeetingRoomSharp className={classes.icons} /> Log In / Register
                </Button>
            </ListItem>
        </List>
    );
}
