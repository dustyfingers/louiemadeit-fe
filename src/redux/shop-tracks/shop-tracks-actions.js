import ShopTracksActionTypes from './shop-tracks-types';

export const setShopTracks = shopTracks => ({
    type: ShopTracksActionTypes.SET_SHOP_TRACKS,
    payload: shopTracks,
});
