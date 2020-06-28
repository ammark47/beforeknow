import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import GridContainer from 'custom_components/Grid/GridContainer'
import GridItem from 'custom_components/Grid/GridItem'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component'
import SearchIcon from '@material-ui/icons/Search'
import SubjectSharpIcon from '@material-ui/icons/SubjectSharp';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import QuestionAnswerSharpIcon from '@material-ui/icons/QuestionAnswerSharp';
import DoneSharpIcon from '@material-ui/icons/DoneSharp';
import '../css/style.min.css'

const styles = {
    timeline: {
        "&:before": {
            background: '#F56476'
        },
        flexWrap: 'wrap'
    },
    iconElement: {
        right: "0",
        left: "unset"
    },
    contentElement: {
        marginRight: "60px",
        marginLeft: "unset"
    },
    element: {
        "&before": {
            left: '100%',
            borderLeft: '7px solid white',
            borderRight: 'unset'
        }
    }
}


const useStyles = makeStyles(styles)

export const ReviewerTimeLine = () => {
    const classes = useStyles()

    return (
            <VerticalTimeline layout='1-column' className={classes.timeline}>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#08415C', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  #08415C' }}
                    iconStyle={{ background: '#08415C', color: '#fff' }}
                    icon={<SearchIcon />}
                    position='left'
                >
                    <h3 className="vertical-timeline-element-title">Search For Your Product</h3>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#08415C', color: '#fff' }}
                    iconStyle={{ background: '#08415C', color: '#fff' }}
                    icon={<SubjectSharpIcon />}
                    position='left'
                >
                    <h3 className="vertical-timeline-element-title">Submit a Review</h3>
                    <p>
                        Uploading a review will let customers know you are open to a conversation.
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#08415C', color: '#fff' }}
                    iconStyle={{ background: '#08415C', color: '#fff' }}
                    icon={<HourglassFullIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Accept Pending Requests</h3>
                    <p>
                        Customers can earn badges like 
                        <span style={{ color: '#F56476' }}> insightful questioner </span> or 
                        <span style={{ color: '#F56476' }}> great listener</span>.  
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#08415C', color: '#fff' }}
                    iconStyle={{ background: '#08415C', color: '#fff' }}
                    icon={<QuestionAnswerSharpIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Chat</h3>
                    <p>
                        Have fun! Aim for candor and thoughtfulness. What did you wish you 
                        knew before you bought this product?
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#F56476', color: '#fff' }}
                    iconStyle={{ background: '#F56476', color: '#fff' }}
                    icon={<DoneSharpIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Earn Tokens!</h3>
                    <p>
                        After a successful conversation, you will be rewarded tokens that
                        can be used to start chats with other reviewers 
                    </p>
                </VerticalTimelineElement>
            </VerticalTimeline>       
    )
}