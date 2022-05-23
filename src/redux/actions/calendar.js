import Swal from "sweetalert2";
import { fetchWithToken } from "../../helpers/fetch";
import { parepareEvents } from "../../helpers/prepareEvents";
import { types } from "../types/types";

export const calendarStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const res = await fetchWithToken("events", event, "POST");
      const body = await res.json();
      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name,
        };
        dispatch(calendarEventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const calendarEventAddNew = (event) => ({
  type: types.calendarEventAddNew,
  payload: event,
});

export const calendarSetActive = (event) => ({
  type: types.calendarEventSetActive,
  payload: event,
});

export const calendarEventClearActive = (event) => ({
  type: types.calendarEventClearActive,
});

export const calendarEventLogout = () => ({
  type: types.calendarEventLogout
})

export const eventStartUpdate = (event) => {
  return async (dispatch)=>{
    try {
      const res = await fetchWithToken(`events/${event.id}`,event,'PUT');
      const body = await res.json();
      if (body.ok) {
        dispatch(calendarEventUpdate(event));
      }else{
        Swal.fire('Error',body.msg,'error');
      }
    } catch (error) {
      console.log(error)
    }
  }
}


const calendarEventUpdate = (event) => ({
  type: types.calendarEventUpdate,
  payload: event,
});

export const calendarStartEventDelete = () =>{
  return async (dispatch, getState)=>{
    const { id } = getState().calendar.activeEvent;
    try {
      const res = await fetchWithToken(`events/${id}`,{},'DELETE');
      const body = await res.json();
      if (body.ok) {
        dispatch(calendarEventDelete());
      }else{
        Swal.fire('Error',body.msg,'error');
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const calendarEventDelete = () => ({
  type: types.calendarEventDelete,
});

export const calendarEventStartLoading = () => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken("events");
      const body = await res.json();
      const events = parepareEvents(body.events);
      if (body.ok) {
        dispatch(calendarEventLoaded(events));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const calendarEventLoaded = (events) => ({
  type: types.calendarEventLoaded,
  payload: events,
});
