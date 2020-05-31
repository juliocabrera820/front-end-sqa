import React from "react";
import { Item, Div, Hora, Aula, Maestro } from "./styles";

const itemHorario = (props) => {
  if (props.hora === "" || props.aula === "") {
    return <div></div>;
  } else {
    return (
      <Item>
        <Div>
          <Hora>{props.hora}</Hora>
          <Aula>Aula: {props.aula}</Aula>
          <Maestro>Maestro: {props.profesor}</Maestro>
        </Div>
      </Item>
    );
  }
};

export default itemHorario;
