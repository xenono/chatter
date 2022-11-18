import {
    LOGIN_FAILED,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_FAILED
} from "../actions/actions";

const initialState = {
    user: {
      _id: "",
      username: "Username"
    },
    isLoggedIn: false,
    chats:[]
}

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case LOGIN_SUCCESS:
            console.log(action )
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user
            }
        default:
            return {
                ...state
            }
    }
}

export default rootReducer