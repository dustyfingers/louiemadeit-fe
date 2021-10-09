import { combineReducers } from 'redux'

import playerReducer from './player/player-reducer'
import trackReducer from './admin/track/track-reducer'
import packReducer from './admin/pack/pack-reducer'
import authReducer from './auth/auth-reducer'
import userReducer from './user/user-reducer'
import shopTracksReducer from './shop-tracks/shop-tracks-reducer'
import cartReducer from './cart/cart-reducer'
import searchQueryReducer from './search/search-reducer'
import displayedTracksReducer from './displayed-tracks/displayed-tracks-reducer'
import searchResultsReducer from './search-results/search-results-reducer'

export default combineReducers({
    player: playerReducer,
    track: trackReducer,
    pack: packReducer,
    auth: authReducer,
    user: userReducer,
    shopTracks: shopTracksReducer,
    cart: cartReducer,
    searchQuery: searchQueryReducer,
    displayedTracks: displayedTracksReducer,
    searchResults: searchResultsReducer
})