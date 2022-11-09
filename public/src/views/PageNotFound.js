import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import ErrorIcon from "../assets/danger.png"

const ErrorImg = styled.img`
  width: 15%;
  min-width: 200px;
`
const PageNotFound = props => {
    return (
        <div className="d-flex justify-content-center align-items-center w-100 flex-column" style={{height:"100vh"}}>
            <ErrorImg src={ErrorIcon} alt="" className="mb-3"/>
            <h1 className="text-danger">Error 404</h1>
            <h4>Page Not Found</h4>
            <a href="/" className="btn btn-lg btn-primary mb-3">Login</a>
            <a href="/signup" className="btn btn-lg btn-warning">Sign up</a>
        </div>
    );
};

PageNotFound.propTypes = {
    
};

export default PageNotFound;