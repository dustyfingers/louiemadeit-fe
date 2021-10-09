import React from "react";

import PackUploadForm from "../../components/PackUploadForm.jsx";

const PackUploadPage = () => {
    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Upload a Pack</h1>
            <PackUploadForm />
        </div>
    );
};

export default PackUploadPage;