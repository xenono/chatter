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
export const UPDATE_CHAT_SUCCESS = "UPDATE_CHAT_SUCCESS"
export const UPDATE_CHAT_FAILED = "UPDATE_CHAT_FAILED"
export const SET_ACTIVE_CHAT_SUCCESS = "SET_ACTIVE_CHAT_SUCCESS"
export const SET_ACTIVE_CHAT_FAILED = "SET_ACTIVE_CHAT_FAILED"
export const CREATE_NEW_CHAT_SUCCESS = "CREATE_NEW_CHAT_SUCCESS"
export const CREATE_NEW_CHAT_FAILED = "CREATE_NEW_CHAT_FAILED"
export const REMOVE_USER_SUCCESS = "REMOVE_USER_SUCCESS"
export const REMOVE_USER_FAILED = "REMOVE_USER_FAILED"
export const EDIT_CHAT_NAME_SUCCESS = "EDIT_CHAT_NAME_SUCCESS"
export const EDIT_CHAT_NAME_FAILED = "EDIT_CHAT_NAME_FAILED"
export const ADD_USERS_TO_CHAT_SUCCESS = "ADD_USERS_TO_CHAT_SUCCESS"
export const ADD_USERS_TO_CHAT_FAILED = "ADD_USERS_TO_CHAT_FAILED"
export const API_URL = process.env.REACT_APP_API_URL

export const login = (username, password) => async dispatch => {
    try {
        const res = await axios.post(API_URL + "/login", {username, password}, {withCredentials: true})
        const publicChat = await axios.get(API_URL + "/getPublicChat", {withCredentials: true})
        if (res.data.status === 200) {
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
    } catch (err) {
        dispatch({
            type: LOGIN_FAILED,
            error: err.message
        })
        return new Error(err.response.data["message"])
    }
}

export const logout = () => async dispatch => {

    try {
        await axios.post(API_URL + "/logout", {}, {withCredentials: true})
        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch (err) {
        dispatch({
            type: LOGOUT_FAILED,
            error: err.message
        })
    }
}

export const authorize = () => async dispatch => {
    try {
        const res = await axios.post(API_URL + "/authorize", {}, {withCredentials: true})
        const publicChat = await axios.get(API_URL + "/getPublicChat", {withCredentials: true})
        if (res.data.status === 200) {
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
    } catch (err) {
        dispatch({
            type: AUTH_FAILED,
            error: err.message
        })
    }
}
export const setActiveChat = (oldChatId, newChatId) => async dispatch => {
    try {
        socket.emit("updateChat", {newChatId, oldChatId}, (response) => {
            console.log(response.status); // ok
        });
        const res = await axios.get(API_URL + "/chat/" + newChatId, {withCredentials: true})

        dispatch({
            type: SET_ACTIVE_CHAT_SUCCESS,
            payload: {
                chat: res.data.chat
            }
        })
    } catch (err) {
        dispatch({
            type: SET_ACTIVE_CHAT_FAILED,
            error: err.message
        })
    }


}

export const sendMessage = (chatId, username, content) => async dispatch => {
    try {
        await axios.post(API_URL + "/chat/send", {chatId, username, content}, {withCredentials: true})
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
    } catch (err) {
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
        const res = await axios.post(API_URL + '/chat/create', newChat, {withCredentials: true})
        dispatch({
            type: CREATE_NEW_CHAT_SUCCESS,
            payload: {
                chat: res.data.chat
            }
        })
    } catch (err) {
        dispatch({
            type: CREATE_NEW_CHAT_FAILED,
            error: err.message
        })
    }
}

export const updateActiveChat = (chatId) => async dispatch => {
    try {
        const res = await axios.get(API_URL + "/chat/" + chatId, {withCredentials: true})
        dispatch({
            type: UPDATE_CHAT_SUCCESS,
            payload: {
                messages: res.data.chat.messages,
            }
        })
    } catch (err) {
        dispatch({
            type: UPDATE_CHAT_FAILED,
            error: err.message
        })
    }
}

export const removeUserFromChat = (chatId, userId) => async dispatch => {
    try {
        await axios.post(API_URL + "/chat/removeUser", {chatId, userId}, {withCredentials: true})
        dispatch({
            type: REMOVE_USER_SUCCESS,
            payload: {
                userId
            }
        })
    } catch (err) {
        dispatch({
            type: REMOVE_USER_FAILED,
            error: err.message
        })
    }
}

export const editChatName = (chatId, newChatName) => async dispatch => {
    try {
        await axios.post(API_URL + "/chat/editChatName", {chatId, newChatName}, {withCredentials: true})
        dispatch({
            type: EDIT_CHAT_NAME_SUCCESS,
            payload: {
                newChatName,
                chatId
            }
        })
    } catch (err) {
        dispatch({
            type: EDIT_CHAT_NAME_FAILED,
            error: err.message
        })
    }
}

export const addUsersToChat = (chatId, users) => async dispatch => {
    console.log(chatId,users)
    try {
        await axios.post(API_URL + "/chat/addUsersToChat", {chatId,users}, {withCredentials:true})
        dispatch({
            type: ADD_USERS_TO_CHAT_SUCCESS,
            payload: {
                users
            }
        })
    }catch(err){
        dispatch({
            type:ADD_USERS_TO_CHAT_FAILED,
            error: err.message
        })
    }
}