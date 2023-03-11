import React from 'react';
import PropTypes from 'prop-types';
import ModalTemplate from "../templates/ModalTemplate";
import {editChatName as editChatNameAction} from "../actions/actions";
import {connect} from "react-redux";

const EditChatModal = ({setModalActive, activeChat, editChatName}) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        const newChatName = e.target.newChatName.value
        editChatName(activeChat._id, newChatName)
        setModalActive(false)
    }
    return (
        <ModalTemplate setModalActive={setModalActive}>
            <div className="d-flex flex-column text-white justify-content-center align-items-center h-100">
                <h3 className="m-3 text-center">Edit chat</h3>
                <form action="" className="d-flex flex-column w-50 m-auto align-items-center h-75"
                      onSubmit={handleSubmit}>
                    <div className="form-group mb-5 w-75">
                        <label htmlFor="newChatName" className="text-center mb-1">New Chat Name</label>
                        <input type="text" name="newChatName" id="newChatName" className="form-control"/>
                    </div>


                    <button className="btn btn-lg text-white btn-warning w-50 mb-5 ml-auto mr-auto">Edit</button>
                </form>
            </div>
        </ModalTemplate>
    );
};

EditChatModal.propTypes = {};

const mapStateToProps = ({activeChat}) => {
    return {
        activeChat
    }
}

const mapDispatchToProps = dispatch => ({
    editChatName: (chatId, newChatName) => dispatch(editChatNameAction(chatId, newChatName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditChatModal);