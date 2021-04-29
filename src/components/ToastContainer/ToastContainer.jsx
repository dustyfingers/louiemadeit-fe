import React from "react";

import Toast from '../Toast/Toast';

const ToastContainer = () => {
    return (
        <div class="toast-container position-absolute p-5 bottom-0 end-0">
            <Toast lead='Bootstrap Toast' body='See? Just like this.' type='info'/>
        </div>
    );
}

export default ToastContainer;