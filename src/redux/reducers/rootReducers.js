//import { combineReducers } from "react-redux";
import { authReducer } from "./authReducer";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./uiReducer";

export const rootReducers ={
    ui:uiReducer,

    //CalendarReducer
    calendar: calendarReducer,

    //AuthReducer
    auth:authReducer
};
