import {
    LOGIN_FAILED,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_FAILED, AUTH_SUCCESS, SET_ACTIVE_CHAT_SUCCESS
} from "../actions/actions";

const initialState = {
    user: {
      _id: "",
      username: ""
    },
    isLoggedIn: false,
    chats:[],
    activeChat: {
        id: null,
        name: null
    }
}

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
                activeChat: action.payload.chat
            }
        case LOGOUT_SUCCESS:
            return initialState
        case AUTH_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                chats: action.payload.chats,
                isLoggedIn: true,
                activeChat: action.payload.chat

            }
        case SET_ACTIVE_CHAT_SUCCESS:
            return {
                ...state,
                activeChat: action.payload.chat
            }
        default:
            return {
                ...state
            }
    }
}

export default rootReducer