import PlayerActionTypes from './player-types';

export const setCurrentTrack = trackUrl => ({
    type: PlayerActionTypes.SET_CURRENT_TRACK,
    payload: trackUrl,
});
