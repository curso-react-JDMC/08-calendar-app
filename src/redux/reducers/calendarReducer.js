import { types } from "../types/types";
import moment from "moment";

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: "Cumple de alguien",
      start: moment(moment().toDate()).format(),
      end: moment(moment().add(2, "hours").toDate()).format(),
      bgcolor: "#fafafa",
      notes: "Comprar la torta",
      user: {
        _id: "123",
        name: "Juan",
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.calendarEventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };
    case types.calendarEventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case types.calendarEventClearActive:
      return {
        ...state,
        activeEvent: null,
      };
    case types.calendarEventUpdate:
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case types.calendarEventDelete:
      return {
        ...state,
        events: state.events.filter((e) => e.id !== state.activeEvent.id),
        activeEvent: null
      };
    default:
      return state;
  }
};
