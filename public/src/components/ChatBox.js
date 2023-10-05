import React, {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import RoundImage from "./RoundImage";
import LeftArrow from '../assets/arrow_left.png'
import RightArrow from '../assets/arrow_right.png'
import {connect} from "react-redux";
import {sendMessage as sendMessageAction, updateActiveChat as updateActiveChatAction} from "../actions/actions";
import ChatMembersList from "./ChatMembersList";
import socket from "../socket/socket";

const Wrapper = styled.div`
  width: 70%;
  background-color: ${({theme}) => theme.normal};
  
  @media (max-width: 800px) {
    width: 100%;
  }

`
const ChatName = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({theme}) => theme.dark};
  color: ${({theme}) => theme.sLight};
  border-bottom: 1px solid ${({theme}) => theme.light};

`
const MessageBox = styled.div`
  color: #c2c3c5;
`

const Chat = styled.div`
  width: 100%;
  z-index: 0;
  overflow-y: scroll;
  max-height: 90%;
  position: relative;
  padding-bottom: 50px;
  padding-right: 7.5%;
  padding-left: 7.5%;
  /* width */

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
const MessageContent = styled.div``;
const MessageStream = styled.div`
  box-shadow: 2px 2px 8px #282828;
  border-radius: 10px;
`;
const UserInfo = styled.div`
  min-height: 50px;
`;
const NewMessageForm = styled.form`
  width: 56%;
  position: fixed;
  bottom: 4%;
  background-color: ${({theme}) => theme.normal};

  box-shadow: 0px 0px 10px ${({theme}) => theme.dark};
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  padding: 5px 5px;

  @media (max-width: 800px) {
    width: 80%;
  }
`

const Input = styled.input`
  width: 80%;
  background-color: transparent;
  box-shadow: none;
  outline: none;
  border: none;
  color: ${({theme}) => theme.light};

`
const Button = styled.button`
  width: 10%;
  background-color: transparent;
  color: ${({theme}) => theme.light};

  :hover {
    color: ${({theme}) => theme.light};
    box-shadow: 0 0 6px ${({theme}) => theme.dark};
  }

`
const RoundImageAbsolute = styled(RoundImage)`
  width: 5%;
  min-width: 50px;
  max-width: 100px;
  margin-right: 15px;
`
const DateText = styled.span`
  color: ${({theme}) => theme.sLight};
`

const MobileArrowButton = styled.img`
  display: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 50%;
  @media (max-width: 800px) {
    display: initial;
  }
  :hover{
    cursor: pointer;
  }
`
const ChatsArrow = styled(MobileArrowButton)`
  left: 3%;
  transform: ${({isActive}) => isActive && 'translateY(-50%) rotate(90deg)'};
  transition: transform 0.2s ease;
`
const FriendsArrow = styled(MobileArrowButton)`
  right: 3%;
  transform: ${({isActive}) => isActive && 'translateY(-50%) rotate(-90deg)'};
  transition: transform 0.2s ease;
`

const ChatBox = ({chat, user, sendMessage, updateActiveChat, setChatsSliderActive, setFriendsSliderActive,isFriendsSliderActive,isChatsSliderActive, setEditChatModalActive, setAddUserToChatModalActive}) => {
        const [messages, setMessages] = useState([]);
        const [chatBottom, setChatBottom] = useState(null);
        const [activeChat, setActiveChat] = useState({_id: "", name: "", messages: []})
        const [chatInput, setChatInput] = useState("")


        const handleChatInputChange = e => {
            setChatInput(e.target.value)
        }

        const onSubmit = e => {
            e.preventDefault();
            const message = e.target.message.value
            sendMessage(chat._id, user.username, message)
            setChatInput("")
        }
        useEffect(() => {
            if (activeChat && chat) {
                setActiveChat(chat)
                setMessages(chat.messages)
            }
            if (chatBottom) {
                chatBottom.scrollIntoView({behavior: "smooth"})
            }
            socket.on("updateChat", (data) => {
                if (chat._id)
                    updateActiveChat(data.chatId)
            })
        }, [chat])
        return (
            <Wrapper>
                {messages ? (
                    <>
                        <ChatName>
                            <h3 className="text-center p-1 pt-2 mb-2">{activeChat.name}</h3>
                            <ChatMembersList setEditChatModalActive={setEditChatModalActive} setAddUserToChatModalActive={setAddUserToChatModalActive}/>
                            <FriendsArrow src={LeftArrow} onClick={() => setFriendsSliderActive(!isFriendsSliderActive)} isActive={isFriendsSliderActive}/>
                            <ChatsArrow src={RightArrow} onClick={() => setChatsSliderActive(!isChatsSliderActive)} isActive={isChatsSliderActive}/>
                        </ChatName>
                        <Chat>
                            {messages.length ? messages.map(msg => (


                                <MessageStream className="mt-3 p-3" key={msg._id}>
                                    <div className="w-100">
                                        <UserInfo className="d-flex mb-2">
                                            {/*<RoundImageAbsolute src={Tiger}/>*/}
                                            <div className="mt-auto mb-auto d-flex justify-content-between w-100">
                                                <span className="text-warning h5">{msg.username}</span>
                                                <DateText
                                                    className="fw-normal fs-6">{new Date(msg.createdAt).toDateString()}</DateText>
                                            </div>
                                        </UserInfo>
                                        <div className="p-l-1">

                                            <MessageBox>
                                                <MessageContent>
                                                    {msg.content}
                                                </MessageContent>
                                            </MessageBox>
                                        </div>

                                    </div>
                                    <div style={{float: "left", clear: "both"}}
                                         ref={(el) => {
                                             setChatBottom(el);
                                         }}>
                                    </div>
                                </MessageStream>
                            )) : (
                                <div className="alert alert-warning mt-3 text-center">
                                    Chat does not have any messages yet!
                                </div>
                            )}
                        </Chat>
                        <NewMessageForm onSubmit={onSubmit} className="d-flex align-items-center justify-content-around"
                                        autocomplete="off">
                            <Input type="text" name="message" id="message" placeholder="New message" value={chatInput} onChange={handleChatInputChange}/>
                            <Button className="btn btn-large" type="submit" onKeyPress={(e) => {
                                if (e.key === "enter") {
                                    onSubmit(e)
                                }
                            }}>Send</Button>
                        </NewMessageForm>
                    </>
                ) : (
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <h1 className="text-white">Loading...</h1>
                    </div>
                )}
            </Wrapper>
        );
    }
;

ChatBox.propTypes = {};

const mapStateToProps = ({activeChat, user}) => {
    return {
        chat: activeChat,
        user
    }
}

const mapDispatchToProps = dispatch => ({
    sendMessage: (chatId, username, content) => dispatch(sendMessageAction(chatId, username, content)),
    updateActiveChat: (chatId) => dispatch(updateActiveChatAction(chatId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);