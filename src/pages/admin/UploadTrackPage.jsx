// import libs/other
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

// import components
import TrackForm from "../../components/TrackForm.jsx";

const UploadTrack = ({ currentUser }) => {
    if(currentUser) {
        return currentUser.isAdmin ?
            (<div>
                <h1>Upload a Track</h1>
                <TrackForm />
            </div>) : 
            <Redirect to="/" />;
    } else { return <Redirect to="/sign-in" />;}

};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser 
});

export default connect(mapStateToProps)(UploadTrack);