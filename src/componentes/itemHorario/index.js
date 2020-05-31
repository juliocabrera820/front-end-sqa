import React from "react";
import { Item, Div, Hora, Aula, Maestro } from "./styles";

const itemHorario = ({ hora, aula, profesor }) => {
  if (hora === "" || aula === "") {
    return <div></div>;
  } else {
    return (
      <Item>
        <Div>
          <Hora id="hora">{hora}</Hora>
          <Aula id="aula">Aula: {aula}</Aula>
          <Maestro id="maestro">Maestro: {profesor}</Maestro>
        </Div>
      </Item>
    );
  }
};

export default itemHorario;
