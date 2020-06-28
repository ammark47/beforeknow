import { combineReducers } from 'redux';
import { SET_CHAT_CLIENT, SET_CHAT_USER_FAILURE, SET_CHAT_USER_REQUEST, SET_CHAT_USER_SUCCESS } from '../actions/chat';

const initialState = {
    isChatUserSet: false,
    settingUser: false
}

function settingUserChat(state = initialState, action) {
    switch (action.type) {
        case SET_CHAT_USER_REQUEST:
            return {
                ...state,
                settingUser: true
            }
        case SET_CHAT_USER_SUCCESS:
            return {
                ...state,
                isChatUserSet: true,
                settingUser: false
            }
        case SET_CHAT_USER_FAILURE:
            return {
                ...state,
                isChatUserSet: false,
                settingUser: false
            }
        default:
            return state;
    }
}

const initialStateChatClient = {
    isChatClientSet: false,
    chatClient: null
}

function settingChatClient(state = initialStateChatClient, action) {
    switch (action.type) {
        case SET_CHAT_CLIENT:
            return {
                ...state,
                isChatClientSet: true,
                chatClient: action.chatClient
            }
        default:
            return state
    }
}

export default combineReducers({ settingUserChat, settingChatClient })