import React, { useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0);
const nowPlus1 = moment().minutes(0).seconds(0).add(1, "hours");

export const CalendarModal = () => {
  const [dateStart, setdateStart] = useState(now.toDate());
  const [dateEnd, setdateEnd] = useState(nowPlus1.toDate());
  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    startDate: now.toDate(),
    endDate: nowPlus1.toDate(),
  });
  const { notes, title, startDate, endDate } = formValues;

  const [titleValid, setTitleValid] = useState(true);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    console.log("closing...");
    // TODO: cerrar el modal
  };

  const handleStartDateChange = (e) => {
    setdateStart(e);
    setFormValues({
      ...formValues,
      startDate: e,
    });
  };

  const handleEndDateChange = (e) => {
    setdateEnd(e);
    setFormValues({
      ...formValues,
      endDate: e,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const momentStart = moment(startDate);
    const momentEnd = moment(endDate);
    if (momentStart.isSameOrAfter(momentEnd)) {
      console.log("segunda fecha debe ser mayor a la primera");
      return Swal.fire(
        "Error",
        "La fecha fin debe ser mayor a la fecha de inicio",
        "error"
      );
    }
    if (title.trim().length <= 2) {
      return setTitleValid(false);
    }
    setTitleValid(true);
    // TODO: realizar grabacion en base de datos
  };

  return (
    <>
      <Modal
        isOpen={true}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={handleSubmitForm}>
          <div className="form-group">
            <label>Fecha y hora inicio</label>
            <DateTimePicker
              onChange={handleStartDateChange}
              value={dateStart}
              minDate={now.toDate()}
              className="form-control"
              name="startDate"
            />
          </div>

          <div className="form-group">
            <label>Fecha y hora fin</label>
            <DateTimePicker
              onChange={handleEndDateChange}
              value={dateEnd}
              minDate={dateStart}
              className="form-control"
              name="endDate"
            />
          </div>

          <hr />
          <div className="form-group">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${!titleValid && "is-invalid"}`}
              placeholder="Título del evento"
              name="title"
              value={title}
              onChange={handleInputChange}
              autoComplete="off"
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={notes}
              onChange={handleInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </>
  );
};
