import React from 'react';
import styled from 'styled-components'
import PublicChatIcon from '../assets/public_chat.png';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import RoundImage from "./RoundImage";
import {setActiveChat as setActiveChatAction} from "../actions/actions";

const Wrapper = styled.div`
  width: 15%;
  border-right: 1px solid ${({theme}) => theme.light};
  color: ${({theme}) => theme.light};
  background-color: ${({theme}) => theme.dark};
`

const ChatRoomsWrapper = styled.div``
const ChatRoomTile = styled.div`
  background-color: ${({isActive, theme}) => isActive ? theme.normal : theme.dark};

  :hover {
    background-color: ${({theme}) => theme.normal};
    cursor: pointer;
  }
  
`

const chats = [
    {
        id: 0,
        name: "Public chat"
    },
    {
        id: 1,
        name: "Chat 1"
    },
    {
        id: 2,
        name: "Chat 2"
    },
    {
        id: 3,
        name: "Chat 3"
    },
    {
        id: 4,
        name: "Chat 4"
    }
]

const ChatNavigation = ({activeChat,setActiveChat}) => {
    const handleChatClick = (id,name) => {
        setActiveChat(id,name)
    }
    return (
        <Wrapper>
            <h3 className="text-center p-1 pt-2 mb-2">Chat rooms</h3>
            <ChatRoomsWrapper className="d-flex flex-column">
                {chats.length && chats.map(chat => (
                    <ChatRoomTile className="d-flex align-items-center p-2" onClick={() => handleChatClick(chat.id,chat.name)} key={chat.id} isActive={chat.id === activeChat}>
                        <RoundImage src={PublicChatIcon} alt=""/>
                        <div className="text-center d-flex align-content-around flex-column">
                            <p className="m-0">{chat.name}</p>
                        </div>

                    </ChatRoomTile>
                ))}

            </ChatRoomsWrapper>
        </Wrapper>
    );
};

const mapStateToProps = ({activeChat}) => {
    return {
        activeChat
    }
}

const mapDispatchToProps = dispatch => ({
    setActiveChat: (chatId,chatName) => dispatch(setActiveChatAction(chatId,chatName))
})

ChatNavigation.propTypes = {};

export default connect(mapStateToProps,mapDispatchToProps)(ChatNavigation);