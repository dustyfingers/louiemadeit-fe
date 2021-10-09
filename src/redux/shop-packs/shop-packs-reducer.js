import ShopPacksActionTypes from './shop-packs-types'

const INITIAL_STATE = {
    shopPacks: null
}

const shopPacksReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case ShopPacksActionTypes.SET_SHOP_PACKS:
            return {
                ...currentState,
                shopPacks: action.payload
            }
        default:
            return currentState
    }
}

export default shopPacksReducer