//import { combineReducers } from "react-redux";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./uiReducer";

export const rootReducers ={
    ui:uiReducer,
    //CalendarReducer
    calendar: calendarReducer
    
    //TODO: AuthReducer

};
