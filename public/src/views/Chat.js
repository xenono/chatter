import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import MainTemplate from "../templates/MainTemplate";
import ChatNavigation from "../components/ChatNavigation";
import ChatBox from "../components/ChatBox";
import FriendsList from "../components/FriendsList";

const ChatWrapper = styled.div`
    height:90vh;
    display: flex;
  justify-content: space-between;
`
const Chat = props => {
    return (
        <MainTemplate>
            <ChatWrapper>
                <ChatNavigation/>
                <ChatBox/>
                <FriendsList/>
            </ChatWrapper>
        </MainTemplate>
    );
};

Chat.propTypes = {

};

export default Chat;