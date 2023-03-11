import React, {useEffect} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Navigate} from "react-router-dom";
import { authorize as authorizeAction} from '../actions/actions'

const Auth = ({children, isLoggedIn, cookies, authorize}) => {
    const isLoggedInCookie = (cookies.get("isLoggedIn") === 'true')
    useEffect(() => {
        authorize()
    }, [])
    if(isLoggedInCookie === false){
        return <Navigate to="/"/>
    }
    return children
};

const mapStateToProps = ({isLoggedIn}) => {
    return {isLoggedIn}
}

const mapDispatchToProps = dispatch => ({
    authorize: () => dispatch(authorizeAction())
})
Auth.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);