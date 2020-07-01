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
        marginTop: '2em'
    }
}))

export const CustomerChat = () => {
    const classes = useStyles()
    const [channel, setChannel] = useState({})
    const [loading, setLoading] = useState(false)
    const [chatClient, setChatClient] = useState(new StreamChat(process.env.REACT_APP_STREAM_CHAT_KEY))
    const user = useSelector(state => state.authReducer.postgres_user)

    const filters = { type: 'messaging',  "$or": [{ customer: user.chat_username }, {direct: user.chat_username}]  };
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
            {loading && <div>Loading chat...</div>}
            {!loading &&
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
                            <MessageList />
                            <MessageInput Input={MessageInputFlat} />
                        </Window>
                        <Thread Message={MessageSimple} />
                    </Channel>
                </Chat>
                )
            }
        </Grid>
    )

}