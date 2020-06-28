import { makeStyles } from "@material-ui/core/styles"
import DoneSharpIcon from '@material-ui/icons/DoneSharp'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import HourglassFullIcon from '@material-ui/icons/HourglassFull'
import SearchIcon from '@material-ui/icons/Search'
import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import '../css/style.min.css'

const styles = {
    timeline: {
        "&:before": {
            background: '#F56476'
        }
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

export const CustomerTimeLine = () => {
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
                    icon={<EmojiPeopleIcon />}
                    position='left'
                >
                    <h3 className="vertical-timeline-element-title">Choose a Reviewer</h3>
                    <p>
                        Reviewers can earn badges like 
                        <span style={{ color: '#F56476' }}> nuanced </span> or 
                        <span style={{ color: '#F56476' }}> life saver</span>. Find
                        someone who will help you know before you buy.
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#08415C', color: '#fff' }}
                    iconStyle={{ background: '#08415C', color: '#fff' }}
                    icon={<HourglassFullIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Wait To Be Accepted</h3>
                    <p>
                        Reviewers also get to choose with whom they chat. They prefer respectful
                        customers with insightful questions, like you. 
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#F56476', color: '#fff' }}
                    iconStyle={{ background: '#F56476', color: '#fff' }}
                    icon={<DoneSharpIcon />}
                >
                    <h3 className="vertical-timeline-element-title">Happy Chatting!</h3>
                    <p>
                        Have a conversation; Just ask the questions; Be casual or cross-reference;
                        Chats are open for 4 days so make it worthwhile!
                    </p>
                </VerticalTimelineElement>
            </VerticalTimeline>       
    )
}