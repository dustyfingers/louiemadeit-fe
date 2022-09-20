import ShopPacksActionTypes from './shop-packs-types';

export const setShopPacks = shopPacks => ({
    type: ShopPacksActionTypes.SET_SHOP_PACKS,
    payload: shopPacks,
});
