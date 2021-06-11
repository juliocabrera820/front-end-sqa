import React from "react";
import { Item, Div, Hora, Aula, Maestro } from "./styles";
import close from "../../assets/close.svg";

const itemHorario = ({ hora, aula, profesor, id, eliminar }) => {
  const eliminarItem = (id) => {
    eliminar(id);
  };

  if (hora === undefined || aula === undefined) {
    return <div></div>;
  } else {
    return (
      <Item>
        <Div>
          {id ? <img src={close} onClick={() => eliminarItem(id)} /> : null}
          <Hora>{hora}</Hora>
          <Aula>Aula: {aula}</Aula>
          <Maestro>Maestro: {profesor}</Maestro>
        </Div>
      </Item>
    );
  }
};

export default itemHorario;
