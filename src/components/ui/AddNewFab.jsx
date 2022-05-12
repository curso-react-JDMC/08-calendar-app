import React from "react";
import { useDispatch } from "react-redux";
import { calendarEventClearActive } from "../../redux/actions/calendar";
import { uiOpenModal } from "../../redux/actions/ui";

export const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleAddNew = () => {
    dispatch(uiOpenModal());
    dispatch(calendarEventClearActive())
  }
  return (
    <button className="btn btn-primary fab" onClick={handleAddNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
