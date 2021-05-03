import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import TrackUploadForm from "../../components/TrackUploadForm/TrackUploadForm.jsx";

const TrackUploadPage = ({ currentUser }) => {
    if (currentUser === null) return <Redirect to="/sign-in" />;
    if (!currentUser.isAdmin) return <Redirect to="/" />;

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

export default connect(mapStateToProps)(TrackUploadPage);