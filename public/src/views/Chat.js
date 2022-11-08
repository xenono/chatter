import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import MainTemplate from "../templates/MainTemplate";

const ChatWrapper = styled.div`
    height:90vh;
`
const Chat = props => {
    return (
        <MainTemplate>
            <ChatWrapper>
                <h1>Chat</h1>

            </ChatWrapper>
        </MainTemplate>
    );
};

Chat.propTypes = {

};

export default Chat;