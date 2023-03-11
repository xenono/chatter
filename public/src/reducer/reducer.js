import {
    LOGIN_FAILED,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_FAILED,
    AUTH_SUCCESS,
    SET_ACTIVE_CHAT_SUCCESS,
    SEND_MESSAGE_SUCCESS,
    CREATE_NEW_CHAT_SUCCESS,
    UPDATE_CHAT_SUCCESS, REMOVE_USER_SUCCESS, EDIT_CHAT_NAME_SUCCESS, AUTH_FAILED, ADD_USERS_TO_CHAT_SUCCESS
} from "../actions/actions";

const initialState = {
    user: {
      _id: "",
      username: ""
    },
    isLoggedIn: false,
    chats:[],
    users:[],
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
                activeChat: action.payload.chat,
                users: action.payload.users

            }
        case LOGOUT_SUCCESS:
            return initialState
        case AUTH_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                chats: action.payload.chats,
                isLoggedIn: true,
                activeChat: action.payload.chat,
                users: action.payload.users

            }
        case AUTH_FAILED:
            return {
                ...initialState
            }
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                activeChat: {
                    ...state.activeChat,
                    messages: [...state.activeChat.messages, action.payload.message]
                }
            }
        case UPDATE_CHAT_SUCCESS:
            return {
                ...state,
                activeChat: {
                    ...state.activeChat,
                    messages: [...action.payload.messages],
                }
            }
        case CREATE_NEW_CHAT_SUCCESS:
            return {
                ...state,
                chats: [...state.chats, action.payload.chat]
            }
        case SET_ACTIVE_CHAT_SUCCESS:
            return {
                ...state,
                activeChat: action.payload.chat
            }
        case REMOVE_USER_SUCCESS:
            return {
                ...state,
                activeChat: {
                    ...state.activeChat,
                    members: [...state.activeChat.members.filter(({_id}) => _id !== action.payload.userId)]
                }
            }
        case EDIT_CHAT_NAME_SUCCESS:
            const editedChat = state.chats.find(c => c._id === action.payload.chatId)
            editedChat.name = action.payload.newChatName
            return {
                ...state,
                activeChat: {
                    ...state.activeChat,
                    name: action.payload.newChatName
                },
                chats: [...state.chats.filter(c => c._id !== action.payload.chatId), editedChat]
            }
        case ADD_USERS_TO_CHAT_SUCCESS:
            return {
                ...state,
                activeChat: {
                    ...state.activeChat,
                    members: [...action.payload.users,...state.activeChat.members]
                }
            }
        default:
            return {
                ...state
            }
    }
}

export default rootReducer