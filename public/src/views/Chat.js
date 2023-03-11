import React, {useState} from 'react';
import styled from 'styled-components'
import {connect} from "react-redux";
import MainTemplate from "../templates/MainTemplate";
import ChatNavigation from "../components/ChatNavigation";
import ChatBox from "../components/ChatBox";
import NewChatModal from "../components/NewChatModal";
import FriendsList from "../components/FriendsList";
import Auth from "../hoc/Auth";
import EditChatModal from "../components/EditChatModal";
import AddUserToChatModal from "../components/AddUserToChatModal";

const ChatWrapper = styled.div`
  height: 90vh;
  max-height: 90vh;
  display: flex;
  justify-content: space-between;
  background-color: ${({theme}) => theme.normal};
  @media(max-width: 800px){
    height3: 82vh;
    position: relative;
  }
`
const Chat = ({state, cookies}) => {
    const [isNewChatModalActive, setNewChatModalActive] = useState(false);
    const [isChatsSliderActive, setChatsSliderActive] = useState(false);
    const [isFriendsSliderActive, setFriendsSliderActive] = useState(false);
    const [isEditChatModalActive, setEditChatModalActive] = useState(false)
    const [isAddUserToChatModalActive, setAddUserToChatModalActive] = useState(false)

    return (
        <MainTemplate>
            <Auth cookies={cookies}>
                <ChatWrapper>
                    { isNewChatModalActive && <NewChatModal setModalActive={setNewChatModalActive} />}
                    { isEditChatModalActive && <EditChatModal setModalActive={setEditChatModalActive} />}
                    { isAddUserToChatModalActive && <AddUserToChatModal setModalActive={setAddUserToChatModalActive} />}
                    <ChatNavigation setModalActive={setNewChatModalActive} isMobile={isChatsSliderActive} />
                    <ChatBox setChatsSliderActive={setChatsSliderActive} setFriendsSliderActive={setFriendsSliderActive} isChatsSliderActive={isChatsSliderActive} isFriendsSliderActive={isFriendsSliderActive} setEditChatModalActive={setEditChatModalActive} setAddUserToChatModalActive={setAddUserToChatModalActive}/>
                    <FriendsList isMobile={isFriendsSliderActive} />
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