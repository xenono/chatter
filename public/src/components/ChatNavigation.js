import React from 'react';
import styled from 'styled-components'
import PublicChatIcon from '../assets/public_chat.png';
import PropTypes from 'prop-types';
import RoundImage from "./RoundImage";

const Wrapper = styled.div`
  width: 15%;
  border-right: 1px solid ${({theme}) => theme.light};
  color: ${({theme}) => theme.light};
  background-color: ${({theme}) => theme.dark};
`

const ChatRoomsWrapper = styled.div``
const ChatRoomTile = styled.div``

const ChatNavigation = props => {
    return (
        <Wrapper>
            <h3 className="text-center p-1 pt-2 mb-2">Chat rooms</h3>
            <ChatRoomsWrapper className="d-flex flex-column">
                <ChatRoomTile className="d-flex align-items-center p-2">
                    <RoundImage src={PublicChatIcon} alt=""/>
                    <div className="text-center d-flex align-content-around flex-column">
                        <p className="m-0">Public Chat</p>
                    </div>

                </ChatRoomTile>
            </ChatRoomsWrapper>
        </Wrapper>
    );
};

ChatNavigation.propTypes = {};

export default ChatNavigation;