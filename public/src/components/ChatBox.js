import React, {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import RoundImage from "./RoundImage";
import Astronaut from "./../assets/astronaut.jpg";
import Tiger from "../assets/tiger.jpg"
import {connect} from "react-redux";

const Wrapper = styled.div`
  width: 70%;
  background-color: ${({theme}) => theme.normal};
  overflow-y: scroll;
  padding-bottom: 10px;
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
const ChatName = styled.div`
  width: 100%;
  background-color: ${({theme}) => theme.dark};
  color: ${({theme}) => theme.sLight};
  border-bottom: 1px solid ${({theme}) => theme.light};

`
const MessageBox = styled.div`
  color: #c2c3c5;
`

const Chat = styled.div`
  width: 80%;
  margin: 0 auto;
  position: relative;
`
const MessageContent = styled.div``;
const MessageStream = styled.div``;
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

const ChatBox = ({chat}) => {
        const [messages, setMessages] = useState([]);
        const [activeChat, setActiveChat] = useState({_id: "", name: "", messages: []})
        const onSubmit = e => {
            e.preventDefault();
            const message = e.target.message.value
            const newMessage = {
                _id: messages.length,
                author: "Astronaut",
                image: Astronaut,
                type: "text",
                content: message,
                createdAt: Date.now()
            }
            setMessages([...messages, newMessage])
        }
        useEffect(() => {
            setActiveChat(chat)
            setMessages(chat.messages)

        }, [chat, activeChat, messages])
        return (
            <Wrapper>
                {messages ? (
                    <>
                        <ChatName>
                            <h3 className="text-center p-1 pt-2 mb-2">{activeChat.name}</h3>
                        </ChatName>
                        <Chat>
                            {messages.length && messages.map(msg => (


                                <MessageStream className="mt-3" key={msg._id}>
                                    <div className="w-100">
                                        <UserInfo className="d-flex mb-3">
                                            <RoundImageAbsolute src={Tiger}/>
                                            <div className="mt-auto mb-auto d-flex justify-content-between w-100">
                                                <span className="text-warning">{msg.username}</span>
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
                                </MessageStream>
                            ))}
                        </Chat>
                        <NewMessageForm onSubmit={onSubmit} className="d-flex align-items-center justify-content-around"
                                        autocomplete="off">
                            <Input type="text" name="message" id="message" placeholder="New message"/>
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

const mapStateToProps = ({activeChat}) => {
    return {
        chat: activeChat
    }
}

export default connect(mapStateToProps)(ChatBox);