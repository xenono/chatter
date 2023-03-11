import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import RoundImage from "./RoundImage";
import UserImage from "../assets/user.png";
import {createNewChat as createNewChatAction} from "../actions/actions";
import ModalTemplate from "../templates/ModalTemplate";

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

const NewChatModal = ({setModalActive, users, createNewChat}) => {

    const handleForm = (e) => {
        e.preventDefault()
        const chatName = e.target.chatName.value
        // Filters inputs to return an array of checked checkboxes only
        const pickedUsers = Array.prototype.slice.call(e.target.users).filter(input => input.checked)
        const users = []
        for (const input of pickedUsers) {
            users.push({username: input.dataset.name, _id: input.value})
        }
        createNewChat(chatName, users)
        setModalActive(false)
    }
    return (
        <ModalTemplate setModalActive={setModalActive}>
            <div className="d-flex flex-column text-white justify-content-center align-items-center h-100">
                <h3 className="m-3 text-center">Create new chat</h3>
                <Form action="" className="d-flex flex-column w-50 m-auto align-items-center h-75"
                      onSubmit={handleForm}>
                    <div className="form-group mb-5 w-75">
                        <label htmlFor="chatName" className="text-center mb-1">Chat Name</label>
                        <input type="text" name="chatName" id="chatName" className="form-control"/>
                    </div>
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
                            <p>Loading...</p>

                        )}
                    </UsersChecklist>

                    <button className="btn btn-lg text-white btn-warning w-50 mb-5 ml-auto mr-auto">Create</button>
                </Form>
            </div>
        </ModalTemplate>
    )
        ;
};

NewChatModal.propTypes = {};

const mapStateToProps = ({users}) => {
    return {
        users
    }
}

const mapDispatchToProps = dispatch => ({
    createNewChat: (chatName, users) => dispatch(createNewChatAction(chatName, users))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewChatModal);