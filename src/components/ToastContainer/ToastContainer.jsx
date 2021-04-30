import React from "react";

import CustomToast from '../CustomToast/CustomToast';

const ToastContainer = () => {
    return (
        <div className="toast-container position-absolute p-3 bottom-0 end-0">
            <CustomToast lead='Bootstrap Toast' body='See? Just like this.' type='info'/>
        </div>
    );
}

export default ToastContainer;