import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import {connect} from "react-redux";
import logo from '../assets/chat.png'
import PropTypes from 'prop-types';
import {Navigate} from "react-router-dom";
import {login as loginAction} from "../actions/actions";
import {API_URL} from "../actions/actions";

const Wrapper = styled.div`
  height: 100vh;
`;
const Form = styled.form`
  border: 2px solid black;
  padding: 50px 100px;
  border-radius: 10px;
  box-shadow: 4px 4px 6px #c4c4c4;
`
const Login = ({login, isLoggedIn}) => {
    const [error, setError] = useState(null)

    const onSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const err = await login(username, password)
        if(err) setError(err)
        else setError(null)
    }
    if(isLoggedIn === true){
        return <Navigate to="/chat" />
    }
    return (
        <Wrapper className="d-flex justify-content-center align-items-center">

            <Form className="form-signin text-center" onSubmit={onSubmit}>
                <img className="mb-1" src={logo} alt="" width="72" height="72"/>
                <h1 className="h1 mb-3 font-weight-normal">Chatter</h1>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        <p className="m-0">{error.message}</p>
                    </div>
                )}
                <label htmlFor="username" className="sr-only mb-2">Username</label>
                <input type="text" id="username" name="username" className="form-control mb-3" placeholder="Username"
                       required
                       autoFocus autoComplete="true"/>
                <label htmlFor="password" className="sr-only mb-2">Password</label>
                <input type="password" id="password" name="password" className="form-control mb-3"
                       placeholder="Password"
                       required autoComplete="true"/>
                <button className="btn btn-lg btn-primary btn-block mt-2" type="submit">Login</button>
                <p className="mt-3">Don't have an account? <a href="/signup">Sign up</a></p>
                <p className="mt-3 mb-1 text-muted">&copy; Adrian Urbanczyk 2022</p>
            </Form>
        </Wrapper>
    );
};

const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(loginAction(username, password))
})

const mapStateToPros = ({isLoggedIn}) => {
    return {
        isLoggedIn
    }
}

Login.propTypes = {};

export default connect(mapStateToPros,mapDispatchToProps)(Login);