import React, { useState, useEffect, useRef } from "react";
import { Toast } from "bootstrap";

// type will determine color
const CustomToast = ({ lead, body, type }) => {
    let [toast, setToast] = useState(true);
    const toastRef = useRef();

    useEffect(() => {
        var myToast = toastRef.current
        var bsToast = Toast.getInstance(myToast)
        console.log(bsToast);

        if (!bsToast) bsToast = new Toast(myToast, { 
            animation: true,
            autohide: true,
            delay: 750
        });
        else toast ? bsToast.show() : bsToast.hide();
        console.log(bsToast);
    });

    return (
        <div className="py-2">
            <div className={`toast ${toast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true" ref={toastRef}>
                <div className="toast-header">
                    <strong className="me-auto">{lead}</strong>
                    <small className="text-muted">just now</small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    {body}
                </div>
            </div>
        </div>
    );
}

export default CustomToast;