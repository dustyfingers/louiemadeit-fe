// import libs/other
import React from "react";
import ReactAudioPlayer from "react-audio-player";
import { connect } from "react-redux";

import "./CustomPlayer.scss";

// takes in url and plays a track - to be used on the main shop page and the single track page
const CustomPlayer = ({currentTrack, dispatch}) => {
    // we need an 'onEnded', 'onPause' and an 'onAbort' to fully flesh out the functionality of this player
    return (
        currentTrack && (<ReactAudioPlayer
            className="w-100 py-0"
            src={currentTrack}
            autoPlay
            controls
            // backgroundColor is the default bg color for the html audio element color #f8f9fa!important
            style={{ 'borderTop': '1px solid grey'}} />)
    );
};

// map state to props here
const mapStateToProps = state => ({
    currentTrack: state.player.currentTrack
});

export default connect(mapStateToProps)(CustomPlayer);