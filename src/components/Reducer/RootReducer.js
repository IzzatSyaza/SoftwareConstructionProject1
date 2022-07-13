import UserReducer from "./UserReducer";
import { combineReducers } from "redux";

const RootReducer = combineReducers({
    UserReducer: UserReducer
})

export default RootReducer