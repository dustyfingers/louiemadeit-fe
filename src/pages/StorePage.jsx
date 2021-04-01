// import libs/other
import React from "react";

// import components
import TrackPreview from "../components/TrackPreview/TrackPreview";

// placeholder data
import SHOP_DATA from "../placeholder_data";

const StorePage = () => {
    const { tracks } = SHOP_DATA;

    return (
        <div>
            <h1>TRACKS:</h1>
            <div className="d-flex flex-wrap">
                {tracks.items.map(track => <TrackPreview track={track} key={track.id}/>)}
            </div>
        </div>
    );
};

export default StorePage;