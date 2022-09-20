// import libs/other
import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { connect } from 'react-redux';

import { setCurrentTrack } from '../redux/player/player-actions';

const CustomPlayer = ({ currentTrack }) => {
    return (
        currentTrack && (
            <ReactAudioPlayer
                src={currentTrack}
                autoPlay
                controls={false}
                onPause={() => setCurrentTrack('')}
            />
        )
    );
};

// map state to props here
const mapStateToProps = state => ({
    currentTrack: state.player.currentTrack,
});

export default connect(mapStateToProps)(CustomPlayer);
