import DisplayedTracksActionTypes from './displayed-tracks-types';

export const setDisplayedTracks = tracks => ({
    type: DisplayedTracksActionTypes.SET_DISPLAYED_TRACKS,
    payload: tracks,
});
