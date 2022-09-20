import PackActionTypes from './pack-types';

export const setPackName = packName => ({
    type: PackActionTypes.SET_PACK_NAME,
    payload: packName,
});
export const setPackDescription = packDescription => ({
    type: PackActionTypes.SET_PACK_DESCRIPTION,
    payload: packDescription,
});
export const setPackZipFile = packFiles => ({
    type: PackActionTypes.SET_PACK_ZIP,
    payload: packFiles,
});
export const setPackCoverArt = packCoverArt => ({
    type: PackActionTypes.SET_COVER_ART,
    payload: packCoverArt,
});
