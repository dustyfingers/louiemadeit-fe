import React, { useEffect } from "react";
import axios from "axios";
import { ToastsStore } from 'react-toasts';
import { connect } from "react-redux";

import TrackUploadForm from "../../components/TrackUploadForm/TrackUploadForm.jsx";
import { apiLink } from "../../env";

const TrackUploadPage = ({ history }) => {
    const checkAuth = async () => {
        try {
            let { data: { user } } = await axios.get(`${apiLink}/auth/current-user`);
            console.log({user});
            if (user === null || user === undefined) history.push("/sign-in");
            if (!user.isAdmin) history.push("/");

        } catch (error) {
            console.log({error});
            ToastsStore.error('There was an error verifying your credentials.');
            history.push("/sign-in");
        }
    }

    useEffect(() => { checkAuth() }, []);

    return (
        <div>
            <h1>Upload a Track</h1>
            <TrackUploadForm />
        </div>
    );
};

export default connect()(TrackUploadPage);