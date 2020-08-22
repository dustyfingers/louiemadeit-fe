// import libs/other
import React from "react";

// import components
import SingleTrack from "../components/SingleTrack.jsx";

const SingleTrackPage = () => {
    return (
        <div>
            <h1>Fetch a Track From S3</h1>
            <SingleTrack />
        </div>
    );
};

export default SingleTrackPage;