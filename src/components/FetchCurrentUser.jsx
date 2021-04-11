import React, {useState} from 'react';
import { connect } from 'react-redux';

const FetchCurrentUser = ({ currentUser }) => {
    return (
        <div>
            <p>{currentUser && currentUser.email}</p>
            <p>{currentUser && currentUser.isAdmin && 'admin'}</p>
        </div>);
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(FetchCurrentUser);