import { combineReducers } from "redux";

import playerReducer from "./player/player-reducer";
import uploadReducer from "./admin/upload/upload-reducer";
import authReducer from "./auth/auth-reducer";
import userReducer from "./user/user-reducer";
import shopTracksReducer from "./shop-tracks/shop-tracks-reducer";

export default combineReducers({
    player: playerReducer,
    upload: uploadReducer,
    auth: authReducer,
    user: userReducer,
    shopTracks: shopTracksReducer
});