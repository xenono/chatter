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
  @media(max-width: 800px){
    height: 85vh;
    position: relative;
  }
`
const Chat = ({state, cookies}) => {
    const [isModalActive, setModalActive] = useState(false);
    const [isChatsSliderActive, setChatsSliderActive] = useState(false);
    const [isFriendsSliderActive, setFriendsSliderActive] = useState(false);
    return (
        <MainTemplate>
            <Auth cookies={cookies}>
                <ChatWrapper>
                    { isModalActive && <NewChatModal setModalActive={setModalActive} />}
                    <ChatNavigation setModalActive={setModalActive} isMobile={isChatsSliderActive} />
                    <ChatBox setChatsSliderActive={setChatsSliderActive} setFriendsSliderActive={setFriendsSliderActive} isChatsSliderActive={isChatsSliderActive} isFriendsSliderActive={isFriendsSliderActive}/>
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