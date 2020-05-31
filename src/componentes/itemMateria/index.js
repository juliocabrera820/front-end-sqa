import React from "react";
import { Item, Div } from "./styles";

const itemMateria = ({ materia }) => (
  <Item>
    <Div>
      <div id="materia">{materia}</div>
    </Div>
  </Item>
);

export default itemMateria;
