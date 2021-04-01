// import libs/other
import React from "react";
import ReactAudioPlayer from "react-audio-player";

// takes in url and plays a track - to be used on the main shop page and the single track page
const CustomPlayer = ({url}) => {
    console.log(url);
    return (
        <ReactAudioPlayer
            className="w-100 py-0"
            src={url}
            autoPlay
            controls />
    );
};

export default CustomPlayer;