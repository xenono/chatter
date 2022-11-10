import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import AstronautImage from '../assets/astronaut.jpg'
import PublicChatIcon from "../assets/public_chat.png";
import RoundImage from "./RoundImage";

const Wrapper = styled.div`
  width: 15%;
  background-color: ${({theme}) => theme.dark};
  border-left: 1px solid ${({theme}) => theme.light};
  color: ${({theme}) => theme.light};
;
`
const FriendTile = styled.div`
  padding-left: 10px;
`

const FriendsList = props => {
    return (
        <Wrapper>
            <h3 className="text-center p-1 pt-2 mb-2">Friends</h3>
            <FriendTile className="d-flex align-items-center">
                <RoundImage src={AstronautImage} alt=""/>
                <div className="text-center d-flex align-content-around flex-column">
                    <p className="m-0">Sally Kristen Ride</p>
                </div>
            </FriendTile>
        </Wrapper>
    );
};

FriendsList.propTypes = {

};

export default FriendsList;