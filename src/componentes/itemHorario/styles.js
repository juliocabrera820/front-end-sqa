import styled from "styled-components";
import { generarColor } from "../../shared/utils/generarColor";

export const Item = styled.div`
  border-radius: 5px;
  margin: 0px;
  ${() => {
    return `background-color:${generarColor()};`;
  }}
`;

export const Div = styled.div`
  background-color: white;
  margin-left: 5px;
`;

export const Hora = styled.div`
  font-size: 20px;
`;

export const Aula = styled.div`
  font-size: 20px;
`;

export const Maestro = styled.div`
  font-size: 18px;
`;
