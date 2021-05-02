// import libs/other
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// import components
import TrackUploadForm from "../../components/TrackUploadForm/TrackUploadForm.jsx";

const TrackUploadPage = ({ currentUser, history }) => {
    console.log(currentUser);
    if(currentUser === null) {
        history.push('/sign-in');
        return null;
    }
    if(!currentUser.isAdmin) {
        history.push('/');
        return null;
    }
    return (
        <div>
            <h1>Upload a Track</h1>
            <TrackUploadForm />
        </div>
    );
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser 
});

export default connect(mapStateToProps)(withRouter(TrackUploadPage));