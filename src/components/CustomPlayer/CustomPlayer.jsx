// import libs/other
import React from "react";
import ReactAudioPlayer from "react-audio-player";
import { connect } from "react-redux";

import "./CustomPlayer.scss";
import { setCurrentTrack } from "../../redux/player/player-actions";

// takes in url and plays a track - to be used on the main shop page and the single track page
const CustomPlayer = ({currentTrack}) => {
    // TODO: looks like we would need an onEnded and an onAbort to flesh out the functionality of this player
    return (
        currentTrack && (<ReactAudioPlayer
            className="w-100 py-0"
            src={currentTrack}
            autoPlay
            controls
            onPause={() => setCurrentTrack('')}
            style={{ 'borderTop': '1px solid grey'}} />)
    );
};

// map state to props here
const mapStateToProps = state => ({
    currentTrack: state.player.currentTrack
});

export default connect(mapStateToProps)(CustomPlayer);