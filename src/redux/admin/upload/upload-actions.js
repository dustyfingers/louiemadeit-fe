import UploadActionTypes from './upload-types';

export const setTrackName = trackName => ({ type: UploadActionTypes.SET_TRACK_NAME, payload: trackName });
export const setTrackDescription = trackDescription => ({ type: UploadActionTypes.SET_TRACK_DESCRIPTION, payload: trackDescription });
export const setTrackTaggedVersion = trackTaggedVersion => ({ type: UploadActionTypes.SET_TAGGED_VERSION, payload: trackTaggedVersion });
export const setTrackUntaggedVersion = trackUntaggedVersion => ({ type: UploadActionTypes.SET_UNTAGGED_VERSION, payload: trackUntaggedVersion });
export const setTrackCoverArt = trackCoverArt => ({ type: UploadActionTypes.SET_COVER_ART, payload: trackCoverArt });
export const setTrackStems = trackStems => ({ type: UploadActionTypes.SET_TRACK_STEMS, payload: trackStems });