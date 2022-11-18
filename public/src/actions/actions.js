import axios from 'axios'

export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILED = "LOGIN_FAILED"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILED = "LOGOUT_FAILED"
export const API_URL = process.env.REACT_APP_API_URL

export const login = (username,password) => async dispatch => {
    try{
        const res = await axios.post(API_URL + "/login", {username,password},{withCredentials:true})
        if(res.data.status === "success"){
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    user: res.data.user
                }
            })
        }
    }catch(err){
        dispatch({
            type: LOGIN_FAILED,
            error: err.message
        })
    }
}