import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { calendarEventDelete } from "../../redux/actions/calendar";

export const DeleteEventFab = () => {
  const dispatch = useDispatch();
  const { activeEvent } = useSelector((state) => state.calendar);


    const handleDelete = () =>{
        dispatch(calendarEventDelete())
    }

  return (
    <>
      {activeEvent && (
        <button className="btn btn-danger fab-danger" onClick={ handleDelete }>
          <i className="fas fa-trash"></i>
          <span> Borrar Evento </span>
        </button>
      )}
    </>
  );
};
