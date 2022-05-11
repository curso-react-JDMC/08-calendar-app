import React, { useState } from "react";
import { Navbar } from "../ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { messages } from "../../helpers/calendar-messages-es";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { uiOpenModal } from "../../redux/actions/ui";
import { useDispatch, useSelector } from "react-redux";
import {
  calendarEventClearActive,
  calendarSetActive,
} from "../../redux/actions/calendar";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

moment.locale("es");

const localizer = momentLocalizer(moment); // or globalizeLocalizer
// const myEventsList = [
//   {
//     title: "Cumple de alguien",
//     start: moment().toDate(),
//     end: moment().add(2, "hours").toDate(),
//     bgcolor: "#fafafa",
//     notes: "Comprar la torta",
//     user: {
//       _id: "123",
//       name: "Juan",
//     },
//   },
// ];

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.calendar);

  const [lastView, setlastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(calendarSetActive(e));
  };

  const onViewChange = (e) => {
    setlastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    dispatch(calendarEventClearActive());
  };

  const eventStartGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStartGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      <AddNewFab />
      <DeleteEventFab />
      <CalendarModal />
    </div>
  );
};
