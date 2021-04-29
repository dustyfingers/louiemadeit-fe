// import libs/other
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

// import components
import TrackUploadForm from "../../components/TrackUploadForm/TrackUploadForm.jsx";

const TrackUploadPage = ({ currentUser }) => {
    if(currentUser) {
        return currentUser.isAdmin ?
            (<div>
                <h1>Upload a Track</h1>
                <TrackUploadForm />
            </div>) : 
            <Redirect to="/" />;
    } else { return <Redirect to="/sign-in" />;}

};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser 
});

export default connect(mapStateToProps)(TrackUploadPage);