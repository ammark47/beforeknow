import { Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReviewerChat } from './ReviewerChat';
import { ReviewerPendingChat } from './ReviewerPendingChat';
import { ReviewerSearchProducts } from './ReviewerSearchProducts';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "theme.palette.background.paper",
        marginTop: '5em',
    },
    tab: {
        backgroundColor: "#D7FDEC",
        color: '#08415C',
    },
    linkTab: {
        "&:hover": {
            backgroundColor: "#F56476",
            color: "#08415C",
            textDecoration: 'none',
            boxShadow:
                "0 14px 26px -12px #F56476, 0 4px 23px 0px #F56476, 0 8px 10px -5px #F56476"
            },
        textDecoration: 'none'
    }
}))


const ReviewerTabPanel = (props) => {
    const { children, value, index, ...other } = props

    return (
        <div 
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
            >
            {value === index && (
                <>
                {children}
                </>
            )}
        </div>
    )
}

const Reviewera11yProps = (index) => {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    }
}

const ReviewerLinkTab = (props) => {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props} />
    )
}

export const ReviewerNavTabs = ({ path }) => {
    const classes = useStyles()
    const history = useHistory()
    const [value, setValue] = useState("review")

    useEffect(() => {
        if (path) {
            setValue(path)
        }
    }, [path])

    const handleChange = (event, newValue) => {
        setValue(newValue)
        history.replace(`/reviewers/${newValue}`)
    };

    return (
        <Grid container className={classes.root} justify="center">
            <Grid item xs={12} md={8}>
                <AppBar position="static">
                    <Tabs
                        selectionFollowsFocus
                        indicatorColor='secondary'
                        className={classes.tab}
                        TabIndicatorProps={{style: {backgroundColor: "#F56476"}}}
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        aria-label="nav tabs"
                        >
                        <ReviewerLinkTab className={classes.linkTab} label="Review A Product"  value={"review"} {...Reviewera11yProps("review")} />
                        <ReviewerLinkTab className={classes.linkTab} label="Pending Chats" value={"pending"} {...Reviewera11yProps("pending")} />
                        <ReviewerLinkTab className={classes.linkTab} label="Chat" value={"chat"} {...Reviewera11yProps("chat")} />
                    </Tabs>
                </AppBar>
            </Grid>
            <Grid item xs={12} md={10} >
                <ReviewerTabPanel value={value} index={"review"}>
                    <ReviewerSearchProducts />
                </ReviewerTabPanel>
                <ReviewerTabPanel value={value} index={"pending"}>
                    <ReviewerPendingChat />
                </ReviewerTabPanel>
                <ReviewerTabPanel value={value} index={"chat"}>
                    <ReviewerChat />
                </ReviewerTabPanel>
            </Grid>
        </Grid>
    )
}