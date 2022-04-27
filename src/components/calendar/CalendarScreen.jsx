import React from "react";
import { Navbar } from "../ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { messages } from "../../helpers/calendar-messages-es";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import { CalendarEvent } from "./CalendarEvent";

moment.locale("es");

const localizer = momentLocalizer(moment); // or globalizeLocalizer
const myEventsList = [
  {
    title: "Cumple de alguien",
    start: moment().toDate(),
    end: moment().add(2, "hours").toDate(),
    bgcolor: "#fafafa",
    notes:'Comprar la torta',
    user: {
      _id: '123',
      name:'Juan'
    }
  },
];



export const CalendarScreen = () => {

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
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStartGetter}
        components={{
          event: CalendarEvent,
        }}
      />
    </div>
  );
};
