import React, {useMemo} from 'react';
import styled from "styled-components";
import {connect} from "react-redux";
import Logo from "../assets/chat.png"
import PropTypes from 'prop-types';
import { logout as logoutAction } from '../actions/actions'
import {Navigate, Redirect} from "react-router-dom";

const Wrapper = styled.div`
  height: 7vh;
  box-shadow: 0 2px 6px #c4c4c4;
`

const LogoImg = styled.img`
  width: 50px;
  height: 100%;
  margin-right: 10px;
`
const Navigation = ({user, logout, isLoggedIn}) => {
    const handleLogout = () => {
        logout();
    }

    return (
        <Wrapper
            className="d-flex flex-column flex-md-row align-items-center justify-content-between p-3 px-md-4 bg-white border-bottom box-shadow">
            <div className="d-flex align-items-center">
                <LogoImg src={Logo} alt=""/>
                <h3 className="my-0 mr-md-auto font-weight-normal">Chatter</h3>
            </div>
            <nav className="my-2 my-md-0 mr-md-3 d-flex">
                <h4 className="p-0 text-dark d-block mt-auto mb-auto" style={{marginRight: '20px'}}><span
                    className="fw-normal">Logged as:</span> {user.username }</h4>
                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </nav>
        </Wrapper>
    );
};

const mapStateToProps = ({user,isLoggedIn}) => {
    return {user,isLoggedIn}
}
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutAction())
})
Navigation.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);