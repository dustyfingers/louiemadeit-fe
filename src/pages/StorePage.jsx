// import libs/other
import React from "react";

// import components
import TrackPreview from "../components/TrackPreview/TrackPreview";

// placeholder data
import SHOP_DATA from "../placeholder_data";

const StorePage = () => {
    const { tracks } = SHOP_DATA;

    return (
        <div className="d-flex flex-column justify-content-center py-5 text-center">
            <h1>TRACKS</h1>
            <div className="d-flex flex-wrap justify-content-center">
                {tracks.items.map(track => <TrackPreview track={track} key={track.id}/>)}
            </div>
        </div>
    );
};

export default StorePage;