import React from "react";
import { Item, Div, Hora, Aula, Maestro } from "./styles";

const itemHorario = ({ hora, aula, profesor }) => {
  if (hora === undefined || aula === undefined) {
    return <div></div>;
  } else {
    return (
      <Item>
        <Div>
          <Hora>{hora}</Hora>
          <Aula>Aula: {aula}</Aula>
          <Maestro>Maestro: {profesor}</Maestro>
        </Div>
      </Item>
    );
  }
};

export default itemHorario;
