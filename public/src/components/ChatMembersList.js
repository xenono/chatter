import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import Menu from '../assets/list.png'
import {connect} from "react-redux";

const Wrapper = styled.div`
  z-index: 100;
  position: absolute;
  height: 100%;
  width: 5%;
  right: 3%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 800px) {
    right: 8%;
  }

  @media (max-width: 625px){
    right: 15%;
  }
`
const Image = styled.img`
  transform: ${({isActive}) => isActive && 'translateY(0) rotate(-90deg)'};
  transition: transform 0.2s ease;
  
  :hover {
    cursor: pointer;
  }
  
 
`

const MembersListModal = styled.div`
  position: absolute;
  //height: 200px;
  width: 250px;
  top: 100%;
  right: -60%;
  opacity: 1;
  background-color: ${(({theme}) => theme.dark)};
`
const ChatMembersList = ({members, admin}) => {
    const [isListActive, setListActive] = useState(false)
    const [chatMembers, setChatMembers] = useState([])
    const handleMenuClick = () => {
        setListActive(!isListActive)
    }
    useEffect(() => {
        if (members) {
            setChatMembers(members)
        }
    }, [members])

    return (
        <Wrapper>
            <Image src={Menu} onClick={handleMenuClick} isActive={isListActive}/>
            {isListActive && (
                <MembersListModal className="border border-warning p-2">
                    <ol className="d-flex justify-content-around align-content-start flex-column h-100">
                        {chatMembers && [...chatMembers].reverse().map(member => {
                            return (
                                <li key={member._id} className="p-1">
                                    {member._id === admin._id ? member.username + " (Admin)" : member.username}
                                </li>
                            )})}
                    </ol>
                </MembersListModal>
            )}
        </Wrapper>
    );
};

ChatMembersList.propTypes = {};

const mapStateToProps = ({activeChat}) => {
    return {
        members: activeChat.members,
        admin: activeChat.admin
    }
}
export default connect(mapStateToProps)(ChatMembersList);