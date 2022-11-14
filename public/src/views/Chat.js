import React from 'react';
import styled from 'styled-components'
import { connect } from "react-redux";
import MainTemplate from "../templates/MainTemplate";
import ChatNavigation from "../components/ChatNavigation";
import ChatBox from "../components/ChatBox";
import FriendsList from "../components/FriendsList";

const ChatWrapper = styled.div`
    height:90vh;
    display: flex;
    justify-content: space-between;
    background-color: ${({theme}) => theme.normal};
`
const Chat = ({state})  => {
    console.log(state)
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

const mapStateToProps = (state) => {
    return {state}
};

Chat.propTypes = {

};

export default connect(mapStateToProps)(Chat)