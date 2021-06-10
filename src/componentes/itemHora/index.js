import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Horas, Minutos } from "../../utils/horarios";
import { Item, Label, Titulo } from "./styles";
import {
  selectClassroom,
  selectStartHour,
  selectStartMinutes,
  selectFinishHour,
  selectFinishMinutes,
} from "../../redux/actions/scheduleAction";

const ItemHora = (props) => {
  const dispatch = useDispatch();

  const { classrooms } = useSelector((state) => state.classroom);

  const setClassrom = (day, classroom) => {
    dispatch(selectClassroom(day, classroom));
  };
  const setStartHour = (day, sh) => {
    dispatch(selectStartHour(day, sh));
  };
  const setStartMinutes = (day, sm) => {
    dispatch(selectStartMinutes(day, sm));
  };
  const setFinishHour = (day, fs) => {
    dispatch(selectFinishHour(day, fs));
  };
  const setFinishMinutes = (day, fm) => {
    dispatch(selectFinishMinutes(day, fm));
  };

  return (
    <Item className="row">
      <Titulo className="col-12">{props.dia}</Titulo>
      <Label>Aula</Label>
      <div className="col-12 form-group">
        <select
          className="form-control"
          disabled={props.status}
          onChange={(e) => setClassrom(props.dia, e.currentTarget.value)}
        >
          <option>Selecciona un salón</option>
          {classrooms?.map((a) => {
            return (
              <option key={a.nombre} value={a.nombre}>
                {a.nombre}
              </option>
            );
          })}
        </select>
      </div>
      <Label>Hora Inicio</Label>
      <div className="col-12 form-group">
        <select
          className="col-6 form-control-sm"
          disabled={props.status}
          onChange={(e) => setStartHour(props.dia, e.currentTarget.value)}
        >
          {Horas.map((h) => {
            return <option key={h.hora}>{h.hora}</option>;
          })}
        </select>
        <select
          className="col-6 form-control-sm"
          disabled={props.status}
          onChange={(e) => setStartMinutes(props.dia, e.currentTarget.value)}
        >
          {Minutos.map((h) => {
            return <option key={h.minutos}>{h.minutos}</option>;
          })}
        </select>
      </div>
      <Label>Hora Final</Label>
      <div className="col-12 form-group">
        <select
          className="col-6 form-control-sm"
          disabled={props.status}
          onChange={(e) => setFinishHour(props.dia, e.currentTarget.value)}
        >
          {Horas.map((h) => {
            return <option key={h.hora}>{h.hora}</option>;
          })}
        </select>
        <select
          className="col-6 form-control-sm"
          disabled={props.status}
          onChange={(e) => setFinishMinutes(props.dia, e.currentTarget.value)}
        >
          {Minutos.map((h) => {
            return <option key={h.minutos}>{h.minutos}</option>;
          })}
        </select>
      </div>
    </Item>
  );
};

export default ItemHora;
