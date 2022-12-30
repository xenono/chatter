import axios from 'axios'
import socket from "../socket/socket";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILED = "LOGIN_FAILED"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILED = "LOGOUT_FAILED"
export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_FAILED = "AUTH_FAILED"
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS"
export const SEND_MESSAGE_FAILED = "SEND_MESSAGE_FAILED"
export const SET_ACTIVE_CHAT_SUCCESS = "SET_ACTIVE_CHAT_SUCCESS"
export const SET_ACTIVE_CHAT_FAILED = "SET_ACTIVE_CHAT_FAILED"
export const CREATE_NEW_CHAT_SUCCESS = "CREATE_NEW_CHAT_SUCCESS"
export const CREATE_NEW_CHAT_FAILED = "CREATE_NEW_CHAT_FAILED"
export const API_URL = process.env.REACT_APP_API_URL

export const login = (username,password) => async dispatch => {
    try{
        const res = await axios.post(API_URL + "/login", {username,password},{withCredentials:true})
        const publicChat = await axios.get(API_URL + "/getPublicChat",{withCredentials:true})
        if(res.data.status === 200){
            socket.connect()
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    user: res.data.user,
                    chat: publicChat.data,
                    users: res.data.users

                }
            })
        }
    }catch(err){
        console.log(err.message)
        dispatch({
            type: LOGIN_FAILED,
            error: err.message
        })
    }
}

export const logout = () => async dispatch => {

    try{
        await axios.post(API_URL + "/logout",{}, {withCredentials:true})
            dispatch({
                type: LOGOUT_SUCCESS,
            })

    }catch(err){
        dispatch({
            type: LOGOUT_FAILED,
            error: err.message
        })
    }
}

export const authorize = () => async dispatch => {
    try {
        const res = await axios.post(API_URL + "/authorize", {},{withCredentials:true})
        const publicChat = await axios.get(API_URL + "/getPublicChat",{withCredentials:true})
        if(res.data.status === 200){
            socket.connect()
            dispatch({
                type: AUTH_SUCCESS,
                payload: {
                    user: {
                        _id: res.data._id,
                        username: res.data.username,
                    },
                    chats: res.data.chats,
                    chat: publicChat.data,
                    users: res.data.users

                }
            })
        }
    }catch (err){
        dispatch({
            type: AUTH_FAILED,
            error: err.message
        })
    }
}
export const setActiveChat = (chatId) => async dispatch => {
    try {
        const res = await axios.get(API_URL + "/chat/" + chatId,{withCredentials:true})
        dispatch({
            type: SET_ACTIVE_CHAT_SUCCESS,
            payload: {
                chat: res.data.chat
            }
        })
    }catch(err){
        dispatch({
            type: SET_ACTIVE_CHAT_FAILED,
            error: err.message
        })
    }


}

export const sendMessage = (chatId, username, content) => async dispatch => {
    try {
        await axios.post(API_URL + "/chat/send",{chatId,username,content},{withCredentials:true})
        const message = {
            username,
            content,
            createdAt: Date.now(),
            _id: chatId
        }
        dispatch({
            type: SEND_MESSAGE_SUCCESS,
            payload: {
                message
            }
        })
    }catch(err){
        dispatch({
            type: SEND_MESSAGE_FAILED,
            error: err.message
        })
    }
}

export const createNewChat = (chatName, users) => async dispatch => {
    const newChat = {
        chatName,
        users
    }
    try {
        const res =  await axios.post(API_URL + '/chat/create',newChat,{withCredentials:true})
        dispatch({
            type: CREATE_NEW_CHAT_SUCCESS,
            payload: {
                chat:res.data.chat
            }
        })
    }catch(err){
        dispatch({
            type: CREATE_NEW_CHAT_FAILED,
            error: err.message
        })
    }
}
