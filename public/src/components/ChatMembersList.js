import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import Menu from '../assets/list.png'
import {connect} from "react-redux";
import {
    removeUserFromChat as removeUserFromChatAction
} from "../actions/actions";

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

  @media (max-width: 625px) {
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

const Button = styled.button`
  height: 100%;
  border-radius: 0;
  color: white;
  width: 90%;

  :hover {
    background-color: white;
    color: black;
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
const ChatMembersList = ({
                             activeChat,
                             members,
                             admin,
                             removeUserFromChat,
                             addUserToChat,
                             user,
                             setEditChatModalActive,
                             setAddUserToChatModalActive
                         }) => {
    const [isListActive, setListActive] = useState(false)
    const [chatMembers, setChatMembers] = useState([])
    const [isAdminLoggedIn, setAdminLoggedIN] = useState(false)

    const handleMenuClick = () => {
        setListActive(!isListActive)
    }
    const handleRemoveUser = (userId) => {
        removeUserFromChat(activeChat._id, userId)
    }

    const handleAddUser = () => {
        setAddUserToChatModalActive(true)
    }

    const handleChatEdit = () => {
        setEditChatModalActive(true)
    }
    useEffect(() => {
        if (members) {
            setChatMembers(members)
        }
        if(user && admin){
            setAdminLoggedIN(user._id === admin._id)
        }
    }, [members,user,admin])

    return (
        <Wrapper>
            <Image src={Menu} onClick={handleMenuClick} isActive={isListActive}/>
            {isListActive && (
                <MembersListModal className="border border-warning p-2">
                    <ol className="d-flex justify-content-around align-content-start flex-column h-100 mt-0 mb-2">
                        {chatMembers && [...chatMembers].reverse().map(member => {
                            const isAdmin = member._id === admin._id
                            return (
                                <li key={member._id} className="p-1 pt-2 pb-2 pr-2 position-relative">
                                    {isAdmin ? (
                                        <div>
                                            {member.username}
                                            <div className="alert alert-success position-absolute m-0 p-1" style={{
                                                right: "10px",
                                                top: "50%",
                                                height: "30px",
                                                transform: "translateY(-50%)"
                                            }}>Admin
                                            </div>
                                        </div>
                                    ) : member.username}
                                    {isAdminLoggedIn && !isAdmin && (
                                        <button
                                            className="btn btn-sm btn-danger ml-auto d-inline-block position-absolute"
                                            style={{
                                                right: "10px",
                                                top: "50%",
                                                height: "30px",
                                                transform: "translateY(-50%)"
                                            }} onClick={() => handleRemoveUser(member._id)}>X</button>
                                    )}
                                </li>
                            )
                        })}
                    </ol>
                    {isAdminLoggedIn && activeChat.name !== "Public Chat" && (
                        <>
                            <Button
                                onClick={handleChatEdit}
                                className="btn btn-lg fs-5 border d-flex justify-content-center align-items-center mb-3 d-block m-auto">Edit
                                chat name</Button>
                            <Button
                                onClick={handleAddUser}
                                className="btn btn-lg fs-5 border d-flex justify-content-center align-items-center d-block m-auto">Add
                                user</Button>
                        </>)
                    }
                </MembersListModal>
            )}
        </Wrapper>
    );
};

ChatMembersList.propTypes = {};

const mapStateToProps = ({activeChat, user}) => {
    return {
        activeChat,
        members: activeChat.members,
        admin: activeChat.admin,
        user
    }
}

const mapDispatchToProps = dispatch => ({
    removeUserFromChat: (chatId, userId) => dispatch(removeUserFromChatAction(chatId, userId))
})
export default connect(mapStateToProps, mapDispatchToProps)(ChatMembersList);