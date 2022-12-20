import React, {useState} from 'react';
import styled from 'styled-components'
import {connect} from "react-redux";
import MainTemplate from "../templates/MainTemplate";
import ChatNavigation from "../components/ChatNavigation";
import ChatBox from "../components/ChatBox";
import NewChatModal from "../components/NewChatModal";
import FriendsList from "../components/FriendsList";
import Auth from "../hoc/Auth";

const ChatWrapper = styled.div`
  height: 90vh;
  max-height: 90vh;
  display: flex;
  justify-content: space-between;
  background-color: ${({theme}) => theme.normal};
`
const Chat = ({state, cookies}) => {
    const [isModalActive, setModalActive] = useState(false);
    return (
        <MainTemplate>
            <Auth cookies={cookies}>
                <ChatWrapper>
                    { isModalActive && <NewChatModal setModalActive={setModalActive} />}
                    <ChatNavigation setModalActive={setModalActive}/>
                    <ChatBox/>
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