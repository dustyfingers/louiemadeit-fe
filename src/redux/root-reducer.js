import { combineReducers } from "redux";

import playerReducer from "./player/player-reducer";
import uploadReducer from "./admin/upload/upload-reducer";

export default combineReducers({
    player: playerReducer,
    upload: uploadReducer
});