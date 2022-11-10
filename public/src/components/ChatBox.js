import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import RoundImage from "./RoundImage";
import Astrounaut from "./../assets/astronaut.jpg";

const Wrapper = styled.div`
  width: 70%;
  background-color: ${({theme}) => theme.normal};
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
`

const MessageContent = styled.div``;
const MessageStream = styled.div``;
const messageStream = ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a gaContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Syd",
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum,",
    "asdhsogr"]

const RoundImageAbsolute = styled(RoundImage)`
  width: 5%;
  min-width: 50px;
  max-width: 100px;
  margin-right: 15px;
`
const DateText = styled.span`
  color: ${({theme}) => theme.sLight};
`

const ChatBox = props => {
    return (
        <Wrapper>
            <ChatName>
                <h3 className="text-center p-1 pt-2 mb-2">Public Chat</h3>
            </ChatName>
            <Chat>
                <MessageStream className="mt-3">
                    <div className="w-100">
                        <div className="d-flex mb-3">
                            <RoundImageAbsolute src={Astrounaut} />
                            <div className="mt-auto mb-auto d-flex justify-content-between w-100">
                                <span className="text-warning">Astrounaut</span>
                                <DateText className="fw-normal fs-6">22:01 10.11.2022</DateText>
                            </div>
                        </div>
                        <div className="p-l-1">

                        {messageStream.map(message => (
                            <MessageBox>
                                <MessageContent>
                                    {message}
                                </MessageContent>
                            </MessageBox>
                        ))}
                        </div>

                    </div>
                </MessageStream>
            </Chat>
        </Wrapper>
    );
};

ChatBox.propTypes = {
    
};

export default ChatBox;