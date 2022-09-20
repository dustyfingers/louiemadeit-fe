import React from 'react';

import TrackUploadForm from '../../../components/TrackUploadForm.jsx';

const TrackUploadPage = () => {
    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Upload a Track</h1>
            <TrackUploadForm />
        </div>
    );
};

export default TrackUploadPage;
