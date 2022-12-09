import React, {useEffect, useState} from 'react';
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

const ChatNavigation = ({activeChat, setActiveChat, chats}) => {
    const [chatNav, setChatNav] = useState([])
    const handleChatClick = (id, name) => {
        setActiveChat(id, name)
    }
    useEffect(() => {
        setChatNav(chats)
    }, [chats])
    return (
        <Wrapper>
            {chatNav.length ? (
                <>
            <h3 className="text-center p-1 pt-2 mb-2">Chat rooms</h3>
            <ChatRoomsWrapper className="d-flex flex-column">
                {chatNav.length && chatNav.map(chat => (
                    <ChatRoomTile className="d-flex align-items-center p-2"
                                  onClick={() => handleChatClick(chat._id, chat.name)} key={chat._id}
                                  isActive={chat._id === activeChat._id}>
                        <RoundImage src={PublicChatIcon} alt=""/>
                        <div className="text-center d-flex align-content-around flex-column">
                            <p className="m-0">{chat.name}</p>
                        </div>

                    </ChatRoomTile>
                ))}

            </ChatRoomsWrapper>
                </>
            ):(
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <h1 className="text-white">Loading...</h1>
                </div>
            )}
        </Wrapper>
    );
};

const mapStateToProps = ({activeChat, chats}) => {
    return {
        activeChat,
        chats
    }
}

const mapDispatchToProps = dispatch => ({
    setActiveChat: (chatId, chatName) => dispatch(setActiveChatAction(chatId, chatName))
})

ChatNavigation.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatNavigation);