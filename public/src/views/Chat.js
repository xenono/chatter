import React from 'react';
import styled from 'styled-components'
import {connect} from "react-redux";
import MainTemplate from "../templates/MainTemplate";
import ChatNavigation from "../components/ChatNavigation";
import ChatBox from "../components/ChatBox";
import FriendsList from "../components/FriendsList";
import Auth from "../hoc/Auth";

const ChatWrapper = styled.div`
  height: 90vh;
  display: flex;
  justify-content: space-between;
  background-color: ${({theme}) => theme.normal};
`
const Chat = ({state, cookies}) => {

    return (
        <MainTemplate>
            <Auth cookies={cookies}>
                <ChatWrapper>
                    <ChatNavigation/>
                    <ChatBox chat={state.activeChat}/>
                    <FriendsList/>
                </ChatWrapper>
            </Auth>
        </MainTemplate>
    );
};

const mapStateToProps = (state) => {
    return {state}
};

Chat.propTypes = {};

export default connect(mapStateToProps)(Chat)