import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import RoundImage from "./RoundImage";
import Astronaut from "./../assets/astronaut.jpg";
import Tiger from "../assets/tiger.jpg"

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

// const messages = [
//     {
//         author: "Astronaut",
//         image: Astronaut,
//         type: "text",
//         content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a gaContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Syd\n" +
//             "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum,",
//         date: new Date(2022, 11, 10, 22, 1, 0)
//     },
//     {
//         author: "Tiger",
//         image: Tiger,
//         type: "text",
//         content: "Apple Pay Later lets customers split a purchase into four equal payments over six weeks, with no interest or fees to pay. Apple Pay Later is available for purchases in apps and online when customers check out with Apple Pay.\n" +
//             "And it’s built into Wallet so customers can easily track what they owe and when they owe it.\n" +
//             "By using the Mastercard network, Apple Pay Later just works with Apple Pay and requires no integration for merchants.",
//         date: new Date(2022, 11, 11, 22, 1, 0)
//     },
// ]

const ChatBox = props => {

    const [messages, setMessages] = useState([]);

    const onSubmit = e => {
        e.preventDefault();
        const message = e.target.message.value
        const newMessage = {
                author: "Astronaut",
                image: Astronaut,
                type: "text",
                content: message,
                date: new Date(Date.now())
            }
        setMessages([...messages, newMessage])
    }
    return (
        <Wrapper>
            <ChatName>
                <h3 className="text-center p-1 pt-2 mb-2">Public Chat</h3>
            </ChatName>
            <Chat>
                {messages.length && messages.map(msg => (


                    <MessageStream className="mt-3" key={msg.date}>
                        <div className="w-100">
                            <UserInfo className="d-flex mb-3">
                                <RoundImageAbsolute src={msg.image}/>
                                <div className="mt-auto mb-auto d-flex justify-content-between w-100">
                                    <span className="text-warning">{msg.author}</span>
                                    <DateText className="fw-normal fs-6">{msg.date.toDateString()}</DateText>
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
            <NewMessageForm onSubmit={onSubmit} className="d-flex align-items-center justify-content-around">
                <Input type="text" name="message" id="message" placeholder="New message"/>
                <Button className="btn btn-large" type="submit" onKeyPress={(e) => {
                    if (e.key === "enter") {
                        onSubmit(e)
                    }
                }}>Send</Button>
            </NewMessageForm>
        </Wrapper>
    );
};

ChatBox.propTypes = {};

export default ChatBox;