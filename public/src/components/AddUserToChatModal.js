import React, {useEffect, useState} from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import ModalTemplate from "../templates/ModalTemplate";
import styled from "styled-components";
import {connect} from "react-redux";
import {addUsersToChat, addUsersToChat as addUsersToChatAction, API_URL} from "../actions/actions";

const Form = styled.form`
  @media (max-width: 800px) {
    width: 85% !important;
  }
`

const UsersChecklist = styled.div`
  border: 1px solid ${({theme}) => theme.light};
  border-radius: 10px;
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
`

const AddUserToChatModal = ({setModalActive, activeChat, addUsersToChat}) => {

    const [users, setUsers] = useState([])

    const getUsers = async () => {
        const {data:{users}}= await axios.post(API_URL + "/chat/usersNotInChat", {chatId: activeChat._id}, {withCredentials: true})
        setUsers(users)
    }
    const handleForm = (e) => {
        e.preventDefault()
        // Filters inputs to return an array of checked checkboxes only
        const inputUsers = Array.prototype.slice.call(e.target.users).filter(input => input.checked)
        const pickedUsers = []
        for (const input of inputUsers) {
            pickedUsers.push({username: input.dataset.name, _id: input.value})
        }
        addUsersToChat(activeChat._id, pickedUsers)
        setModalActive(false)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <ModalTemplate setModalActive={setModalActive}>
            <div className="d-flex flex-column text-white justify-content-center align-items-center h-100">
                <h3 className="m-3 text-center">Add users to {activeChat.name}</h3>
                <Form action="" className="d-flex flex-column w-50 m-auto align-items-center h-75"
                      onSubmit={handleForm}>
                    <h5>Available users</h5>
                    <UsersChecklist className="mb-5 w-75">
                        {users && users.length ? users.map(user => (
                            <div className="form-check" key={user._id}>
                                <input className="form-check-input" type="checkbox" value={user._id} name="users"
                                       data-name={user.username}/>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    {user.username}
                                </label>
                            </div>
                        )) : (
                            <div className="w-100 h-100 d-flex justify-content-center align-items-center d-block">
                                <h3 className="text-white">Loading...</h3>
                            </div>

                        )}
                    </UsersChecklist>

                    <button className="btn btn-lg text-white btn-warning w-50 mb-5 ml-auto mr-auto">Add</button>
                </Form>
            </div>
        </ModalTemplate>
    );
};

AddUserToChatModal.propTypes = {};

const mapStateToProps = ({activeChat}) => {
    return {activeChat}
}

const mapDispatchToProps = dispatch => ({
    addUsersToChat: (chatId, userId) => dispatch(addUsersToChatAction(chatId, userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddUserToChatModal);