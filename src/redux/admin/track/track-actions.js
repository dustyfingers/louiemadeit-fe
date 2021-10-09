import TrackActionTypes from './track-types';

export const setTrackName = trackName => ({ type: TrackActionTypes.SET_TRACK_NAME, payload: trackName });
export const setTrackDescription = trackDescription => ({ type: TrackActionTypes.SET_TRACK_DESCRIPTION, payload: trackDescription });
export const setTrackTaggedVersion = trackTaggedVersion => ({ type: TrackActionTypes.SET_TAGGED_VERSION, payload: trackTaggedVersion });
export const setTrackUntaggedVersion = trackUntaggedVersion => ({ type: TrackActionTypes.SET_UNTAGGED_VERSION, payload: trackUntaggedVersion });
export const setTrackCoverArt = trackCoverArt => ({ type: TrackActionTypes.SET_COVER_ART, payload: trackCoverArt });
export const setTrackStems = trackStems => ({ type: TrackActionTypes.SET_TRACK_STEMS, payload: trackStems });