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
  right: 1%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
`
const Image = styled.img`
  height: 85%;

  :hover {
    cursor: pointer;
  }
`

const MembersListModal = styled.div`
  position: absolute;
  //height: 200px;
  width: 200px;
  top: 100%;
  right: 0;
  opacity: 1;
  background-color: ${(({theme}) => theme.dark)};
`
const ChatMembersList = ({members}) => {
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
            <Image src={Menu} onClick={handleMenuClick}/>
            {isListActive && (
                <MembersListModal className="border border-warning p-2">
                    <ol className="d-flex justify-content-around align-content-start flex-column h-100">
                        {chatMembers && chatMembers.map(member => (
                            <li>
                                {member.username}
                            </li>
                        ))}
                    </ol>
                </MembersListModal>
            )}
        </Wrapper>
    );
};

ChatMembersList.propTypes = {};

const mapStateToProps = ({activeChat}) => {
    return {
        members: activeChat.members
    }
}
export default connect(mapStateToProps)(ChatMembersList);