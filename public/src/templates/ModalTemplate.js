import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  max-height: 90vh;
  z-index: 999;

`
const Background = styled.div`
  z-index: 999;
  background-color: ${({theme}) => theme.dark};
  opacity: 0.9;
`

const ModalBody = styled.div`
  z-index: 999;
  @media (max-width: 1250px) {
    width: 90% !important;
  }
  @media (max-width: 800px) {
    width: 85% !important;
  }
`

const ModalTemplate = ({setModalActive, children}) => {

    return (
        <Wrapper className="w-100 h-100 position-absolute d-flex justify-content-center align-items-center">
            <Background className="w-100 h-100 position-absolute" onClick={() => setModalActive(false)}/>
            <ModalBody className="w-50 bg-dark border-warning border border-1">
                {{...children}}
            </ModalBody>
        </Wrapper>
    );
};

ModalTemplate.propTypes = {};


export default ModalTemplate;