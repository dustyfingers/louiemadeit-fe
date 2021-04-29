import React from "react";

// type will determine color
const Toast = ({ lead, body, type }) => {
    return (
        <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <strong className="me-auto">{lead}</strong>
                <small className="text-muted">just now</small>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
                {body}
            </div>
        </div>
    );
}

export default Toast;