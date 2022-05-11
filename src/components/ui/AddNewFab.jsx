import React from "react";
import { useDispatch } from "react-redux";
import { calendarSetActive } from "../../redux/actions/calendar";
import { uiOpenModal } from "../../redux/actions/ui";

export const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleAddNew = () => {
    dispatch(uiOpenModal());
    dispatch(calendarSetActive(null))
  }
  return (
    <button className="btn btn-primary fab" onClick={handleAddNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
