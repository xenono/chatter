import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import { connect} from "react-redux";
import RoundImage from "./RoundImage";
import UserImage from "../assets/user.png";
import {createNewChat as createNewChatAction} from "../actions/actions";

const Wrapper = styled.div`
  max-height: 90vh;
  z-index: 990;
`
const Background = styled.div`
  z-index: 995;
  background-color: ${({theme}) => theme.dark};
  opacity: 0.9;
`

const Modal = styled.div`
  z-index: 999;
`

const UsersChecklist = styled.div`
  border: 1px solid ${({theme}) => theme.light};
  border-radius: 10px;
  padding: 10px;
`

const NewChatModal = ({setModalActive, users, createNewChat}) => {

    const handleForm = (e) => {
        e.preventDefault()
        const chatName = e.target.chatName.value
        // Filters inputs to return an array of checked checkboxes only
        const pickedUsers = Array.prototype.slice.call(e.target.users).filter(input => input.checked)
        const users = []
        for(const input of pickedUsers){
            users.push({username:input.dataset.name, _id: input.value})
        }
        createNewChat(chatName, users)
        setModalActive(false)
    }
    return (
        <Wrapper className="w-100 h-100 position-absolute d-flex justify-content-center align-items-center" >
            <Background className="w-100 h-100 position-absolute" onClick={() => setModalActive(false)}/>
            <Modal className="w-50 h-75 bg-dark border-warning border border-1">
                <div className="d-flex flex-column text-white">
                    <h3 className="m-2 text-center">Create new chat</h3>
                    <form action="" className="d-flex flex-column w-50 m-auto" onSubmit={handleForm}>
                        <div className="form-group mt-3">
                            <label htmlFor="chatName" className="text-center mb-1">Chat Name</label>
                            <input type="text" name="chatName" id="chatName" className="form-control"/>
                        </div>
                        <UsersChecklist className="mt-3">
                            {users && users.length ? users.map(user => (
                                <div className="form-check" key={user._id}>
                                    <input className="form-check-input" type="checkbox" value={user._id} name="users" data-name={user.username}/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        {user.username}
                                    </label>
                                </div>
                            )): (
                                <p>Loading...</p>

                            )}
                        </UsersChecklist>

                        <button className="btn btn-lg text-white">Create</button>
                    </form>
                </div>
            </Modal>
        </Wrapper>
    );
};

NewChatModal.propTypes = {

};

const mapStateToProps = ({users}) => {
    return {
        users
    }
}

const mapDispatchToProps = dispatch => ({
    createNewChat: (chatName,users) => dispatch(createNewChatAction(chatName,users))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewChatModal);