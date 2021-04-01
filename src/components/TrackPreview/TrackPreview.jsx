// import libs/other
import React from "react";

const TrackPreview = ({track}) => {
    return (
        <div className="card col-sm-6 col-md-4 col-lg-2 m-3">
            <img src={track.coverUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <p className="card-text">{track.title}</p>
                <p className="card-text">Play track button</p>
            </div>
        </div>
    );
};

export default TrackPreview;