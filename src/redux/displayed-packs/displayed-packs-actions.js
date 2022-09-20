import DisplayedPacksActionTypes from './displayed-packs-types';

export const setDisplayedPacks = packs => ({
    type: DisplayedPacksActionTypes.SET_DISPLAYED_PACKS,
    payload: packs,
});
