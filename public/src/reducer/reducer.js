
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
        default:
            return {
                ...state
            }
    }
}

export default rootReducer