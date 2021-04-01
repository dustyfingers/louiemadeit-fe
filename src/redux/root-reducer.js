import { combineReducers } from "redux";

import playerReducer from "./player/player-reducer";

export default combineReducers({
    player: playerReducer
});