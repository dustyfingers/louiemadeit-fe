import React, { useState, useEffect, useRef } from "react";
import { Toast } from "bootstrap";

// type will determine color
const CustomToast = ({ lead, body, type }) => {
    let [toast, setToast] = useState(false);
    const toastRef = useRef();

    useEffect(() => {
        var myToast = toastRef.current
        console.log(myToast);
        var bsToast = Toast.getInstance(myToast)
        console.log(bsToast);

        if (!bsToast) {
            // initialize Toast
            bsToast = new Toast(myToast, {autohide: false})
        }
        else{
            // toggle
            toast ? bsToast.show() : bsToast.hide()

        }
    });

    return (
        <div className="py-2">
            <button className="btn btn-success" onClick={() => setToast(!toast)}>
                Toast {toast ? 'hide' : 'show'}
            </button>
            <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true" ref={toastRef}>
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