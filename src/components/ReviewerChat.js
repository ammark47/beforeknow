import { Grid, makeStyles } from '@material-ui/core';
import { logIn } from "Auth0";
import "css/chat.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StreamChat } from "stream-chat";
import {
    Channel,
    ChannelHeader, ChannelList,
    ChannelListMessenger,
    ChannelPreviewMessenger, Chat,
    MessageInput, MessageInputFlat,
    MessageList,
    MessageSimple, Thread,
    Window
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";




const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        marginTop: '2em'
    }
}))

export const ReviewerChat = () => {
    const classes = useStyles()
    const [channel, setChannel] = useState({})
    const [loading, setLoading] = useState(false)
    const [chatClient, setChatClient] = useState(new StreamChat(process.env.REACT_APP_STREAM_CHAT_KEY))
    const [channelId, setChannelId] = useState("")
    const user = useSelector(state => state.authReducer.postgres_user)

    const filters = { type: 'messaging', "$or": [ { reviewer: user.chat_username }, { direct: user.chat_username }] }
    const sort = { last_message_at: -1 };

    useEffect(() => {
        const setReviewer = async () => {
            setLoading(true)

            // Set the current chat user
            await chatClient.setUser(
                {
                    id: user.chat_username,
                    name: user.name,
                    image: `https://getstream.io/random_svg/?id=${user.chat_username}&name=${user.name}`
                },
                user.chat_token,
            )
            
            setLoading(false)
        }
        if (!user) {
            logIn()
        }

        setReviewer()

        return async () => await chatClient.disconnect()
    }, [user, chatClient])

    const setActiveChannel = (channel) => {
        setChannel(channel)
    }

    const UsedChannelHeader = !channel ? ChannelHeader :
        class CustomChannelHeader extends React.PureComponent {
            render() {
                return (
                    <div className="str-chat__header-livestream">
                        <div className="str-chat__header-livestream-left">
                            <p className="str-chat__header-livestream-left--title">
                            {channel.data.productName}
                            </p>
                        </div>
                        <div className="str-chat__header-livestream-right">
                            <div className="str-chat__header-livestream-right-button-wrapper">
                            {/* <button
                                className="logout"
                                onClick={() =>
                                    console.log('logout')
                                }
                            >
                                Logout
                            </button> */}
                            </div>
                        </div>
                    </div>
                );
            }
        }


    return (
        <Grid item container xs={12} className={classes.root} >
            {!channel && <div>Loading chat...</div>}
            {channel && 
                (<Chat client={chatClient} theme="messaging light"  >
                    <ChannelList
                        List={ChannelListMessenger}
                        Preview={ChannelPreviewMessenger}
                        filters={filters}
                        sort={sort}
                        setActiveChannel={setActiveChannel}
                    >
                    </ChannelList>
                    <Channel channel={channel}>
                        <Window>
                            <UsedChannelHeader />
                            <MessageList/>
                            <MessageInput  Input={MessageInputFlat} />
                        </Window>
                        <Thread Message={MessageSimple} />
                    </Channel>
                </Chat>
                )
            }
        </Grid>
    )

}