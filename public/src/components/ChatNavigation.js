import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  width: 15%;
  background-color:#3582DB;
`
const ChatNavigation = props => {
    return (
        <Wrapper>
            <h3 className="text-center border-bottom border-2 border-dark p-2">Chat rooms</h3>
        </Wrapper>
    );
};

ChatNavigation.propTypes = {
    
};

export default ChatNavigation;