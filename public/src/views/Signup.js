import React, {useState} from 'react';
import axios from 'axios'

import PropTypes from 'prop-types';
import logo from "../assets/chat.png";
import {Navigate, useNavigate} from "react-router-dom";
import styled from "styled-components";
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

const Signup = props => {
    const [isFormSubmit, setFormSubmit] = useState(false)
    const onSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        try {
            await axios.post(API_URL + "/signup",{username,password,confirmPassword})
            setFormSubmit(true)
        }catch(err){
            console.log(err.response.data)
            setFormSubmit(false)
        }

    }
    if(isFormSubmit === true){
        return <Navigate to="/chat" />
    }
    return (
        <Wrapper className="d-flex justify-content-center align-items-center">
            <Form className="form-signin text-center" onSubmit={onSubmit}>
                <img className="mb-1" src={logo} alt="" width="72" height="72"/>
                <h1 className="h1 mb-3 font-weight-normal">Chatter</h1>
                <label htmlFor="username" className="sr-only mb-2">Username</label>
                <input type="text" id="username" name="username" className="form-control mb-3" placeholder="Username"
                       required
                       autoFocus autoComplete="true"/>
                <label htmlFor="password" className="sr-only mb-2">Password</label>
                <input type="password" id="password" name="password" className="form-control mb-3"
                       placeholder="Password"
                       required autoComplete="true"/>
                <label htmlFor="confirmPassword" className="sr-only mb-2">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" className="form-control mb-3"
                       placeholder="Confirm Password"
                       required autoComplete="true"/>
                <button className="btn btn-lg btn-primary btn-block mt-2" type="submit">Create an account</button>
                <p className="mt-3">Already have an account? <a href="/">Login</a></p>

                <p className="mt-4 mb-3 text-muted">&copy; Adrian Urbanczyk 2022</p>
            </Form>
        </Wrapper>
    );

};

Signup.propTypes = {};

export default Signup;