import { types } from "../types/types";

export const calendarEventAddNew = (event) => ({
  type: types.calendarEventAddNew,
  payload: event,
});

export const calendarSetActive = (event) => ({
  type: types.calendarEventSetActive,
  payload: event,
});

export const calendarEventClearActive = (event) => ({
    type:types.calendarEventClearActive,
})

export const calendarEventUpdate = (event) => ({
  type: types.calendarEventUpdate,
  payload: event,
});

export const calendarEventDelete = () => ({
  type: types.calendarEventDelete,
});