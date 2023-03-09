import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import styled from "styled-components";
import UserImage from '../assets/user.png'
import RoundImage from "./RoundImage";

const Wrapper = styled.div`
  width: 15%;
  overflow-y: auto;
  background-color: ${({theme}) => theme.dark};
  border-left: 1px solid ${({theme}) => theme.light};
  color: ${({theme}) => theme.light};;
  @media (max-width: 800px) {
    width: 50%;
    max-height: 350px;
    display: ${props => props.isMobile ? "initial" : "none"} !important;
    position: absolute;
    right: 0;
    top: 7%;
    z-index: 990;
  }
}
`
const FriendTile = styled.div`
  padding-left: 10px;
`

const FriendsList = ({users, isMobile}) => {
    return (
        <Wrapper isMobile={isMobile}>
            <h3 className="text-center p-1 pt-2 mb-2">Users list</h3>
            <div className="d-flex justify-content-start flex-column h-100 p-1" style={{maxHeight:"80vh"}}>
                {users && users.length ? users.map(user => (
                    <FriendTile className="d-flex align-items-center justify-content-start mb-3" key={user._id}>
                        <RoundImage src={UserImage} alt="" className="mr-3"/>
                        <div className="text-center d-flex justify-content-center align-items-center">
                            <p className="m-0 text-warning">{user.username}</p>
                        </div>
                    </FriendTile>
                )) : (
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <h3 className="text-white">Loading...</h3>
                    </div>

                )}
            </div>
        </Wrapper>
    );
};

FriendsList.propTypes = {};

const mapStateToProps = ({users}) => {
    return {users}
}
export default connect(mapStateToProps)(FriendsList);