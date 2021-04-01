// import libs/other
import React from "react";
import ReactAudioPlayer from "react-audio-player";
import { connect } from "react-redux";

import "./CustomPlayer.scss";

// takes in url and plays a track - to be used on the main shop page and the single track page
const CustomPlayer = ({currentTrack}) => {
    return (
        <ReactAudioPlayer
            className="w-100 py-0"
            src={currentTrack}
            autoPlay
            controls />
    );
};

// map state to props here
const mapStateToProps = state => ({
    currentTrack: state.player.currentTrack
});

export default connect(mapStateToProps)(CustomPlayer);