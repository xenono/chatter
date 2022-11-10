import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

const Wrapper = styled.div`
  height: 3vh;
  border-top: 1px solid  ${({theme}) => theme.light};;
  background-color: ${({theme}) => theme.normal};
;
`

const Footer = props => {
    return (
        <Wrapper className="d-flex justify-content-center align-items-center">
            <h3 className="text-center h6 text-muted m-0">&copy; Adrian Urbanczyk 2022</h3>
        </Wrapper>
    );
};

Footer.propTypes = {

};

export default Footer;