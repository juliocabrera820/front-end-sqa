import React from "react";
import { Item, Div } from "./styles";

const itemMateria = ({ materia }) => (
  <Item>
    <Div>
      <div>{materia}</div>
    </Div>
  </Item>
);

export default itemMateria;
