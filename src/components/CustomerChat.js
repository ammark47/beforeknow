import React, { useState, useEffect } from "react"
import { Grid } from '@material-ui/core'
import {
Chat,
Channel,
Thread,
Window,
ChannelList,
ChannelListTeam,
MessageList,
MessageTeam,
MessageInput,
ChatDown,
ChannelPreviewCompact,
ChannelPreviewMessenger,
ChannelPreview,
} from "stream-chat-react";
import { StreamChat } from "stream-chat"

import "stream-chat-react/dist/css/index.css"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core"
import { logIn } from "Auth0"
import "css/chat.css"



const useStyles = makeStyles(() => ({
    root: {
        marginTop: '2em'
    }
}))

export const CustomerChat = () => {
    const classes = useStyles()
    const [channel, setChannel] = useState({})
    const [loading, setLoading] = useState(false)
    const [chatClient, setChatClient] = useState(new StreamChat("d2msy7mn26aa"))
    const [channelId, setChannelId] = useState("")
    const user = useSelector(state => state.authReducer.postgres_user)
    const { customerId, reviewId } = useParams()

    const filters = { type: 'messaging', members: { $in: [user.chat_username] }, customer: user.chat_username };
    const sort = { last_message_at: -1 };

    useEffect(() => {
        const setCustomer = async () => {
            setLoading(true)

            // Set the current chat user
            const response = await chatClient.setUser(
                {
                    id: user.chat_username,
                    name: user.name,
                    image: 'https://getstream.io/random_svg/?id=broken-cake-1&name=Broken+cake'
                },
                user.chat_token,
            )
            
            setLoading(false)
        }
        if (!user) {
            logIn()
        }

        setCustomer()

        return () => chatClient.disconnect()
    }, [user, chatClient])

    const setActiveChannel = (channel) => {
        setChannel(channel)
    }


    return (
        <Grid item container xs={12} className={classes.root} >
            {loading && <div>Loading chat...</div>}
            {!loading && 
                (<Chat client={chatClient} theme="messaging light"  >
                    <ChannelList
                        Preview={ChannelPreviewCompact}
                        filters={filters}
                        sort={sort}
                        setActiveChannel={setActiveChannel}
                        className="str-chat__header-livestream"
                    >
                    </ChannelList>
                    <Channel channel={channel}>
                        <Window>
                            <MessageList Message={MessageTeam} />
                            <MessageInput focus />
                        </Window>
                        <Thread Message={MessageTeam} />
                    </Channel>
                </Chat>
                )
            }
        </Grid>
    )

}