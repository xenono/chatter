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

const ChatRoomsWrapper = styled.div`
  height: 95%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */

  ::-webkit-scrollbar-track {
    background: ${({theme}) => theme.normal};
  }

  /* Handle */

  ::-webkit-scrollbar-thumb {
    background: ${({theme}) => theme.light};
  }

  /* Handle on hover */

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`
const ChatRoomTile = styled.div`
  background-color: ${({isActive, theme}) => isActive ? theme.normal : theme.dark};

  :hover {
    background-color: ${({theme}) => theme.normal};
    cursor: pointer;
  }

`

const AddNewChatWrapper = styled.div`
  height: 5%;
`

const Button = styled.button`
  border-radius: 0;
  color:white;
  :hover {
    background-color: white;
    color: black;
  }
`

const ChatNavigation = ({activeChat, setActiveChat, chats, setModalActive}) => {
    const [chatNav, setChatNav] = useState([])
    const handleChatClick = (id) => {
        setActiveChat(activeChat._id, id)
    }
    useEffect(() => {
        setChatNav(chats)
    }, [chats])
    return (
        <Wrapper className="d-flex justify-content-between flex-column">

            <h3 className="text-center p-1 pt-2 mb-2">Chat rooms</h3>
            {chatNav.length ? (
                <>
            <ChatRoomsWrapper className="d-flex flex-column">
                {chatNav.length && chatNav.map(chat => (
                    <ChatRoomTile className="d-flex align-items-center p-2"
                                  onClick={() => handleChatClick(chat._id,chat.name)} key={chat._id}
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
            <AddNewChatWrapper className="mb-1">
                <Button className="btn btn-lg w-100 fs-5 border" onClick={() => setModalActive(true)}>Create new chat</Button>
            </AddNewChatWrapper>
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
    setActiveChat: (oldChatId, newChatId) => dispatch(setActiveChatAction(oldChatId, newChatId))
})

ChatNavigation.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatNavigation);