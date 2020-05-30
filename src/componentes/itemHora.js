import React from "react";
import styled from "styled-components";
import { Horas, Minutos } from "./horarios";

const itemHora = (props) => {
  const { Dia, hi, hf, mi, mf } = props;

  return (
    <Item className="row">
      <Titulo className="col-12">{props.dia}</Titulo>
      <Label>Aula</Label>
      <div className="col-12 form-group">
        <select
          className="form-control"
          disabled={props.status}
          onChange={(e) => Dia(props.dia, e.currentTarget.value)}
        >
          <option>Selecciona un salón</option>
          {props.aulas.map((a) => {
            return (
              <option key={a.Clv_Aula} value={a.Clv_Aula}>
                {a.Clv_Aula}
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
          onChange={(e) => hi(props.dia, e.currentTarget.value)}
        >
          {Horas.map((h) => {
            return <option key={h.hora}>{h.hora}</option>;
          })}
        </select>
        <select
          className="col-6 form-control-sm"
          disabled={props.status}
          onChange={(e) => mi(props.dia, e.currentTarget.value)}
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
          onChange={(e) => hf(props.dia, e.currentTarget.value)}
        >
          {Horas.map((h) => {
            return <option key={h.hora}>{h.hora}</option>;
          })}
        </select>
        <select
          className="col-6 form-control-sm"
          disabled={props.status}
          onChange={(e) => mf(props.dia, e.currentTarget.value)}
        >
          {Minutos.map((h) => {
            return <option key={h.minutos}>{h.minutos}</option>;
          })}
        </select>
      </div>
    </Item>
  );
};

export default itemHora;

const Item = styled.div`
  text-align: center;
  vertical-align: middle;
`;

const Label = styled.label`
  padding-right: 15px;
  padding-left: 15px;
`;

const Titulo = styled.div`
  font-family: "Yanone Kaffeesatz", sans-serif;
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 20px;
`;
