import React from "react";
import { Item, Div } from "./styles";

const itemMateria = (props) => {
  return (
    <Item>
      <Div>
        <div>{props.materia}</div>
      </Div>
    </Item>
  );
};

export default itemMateria;
