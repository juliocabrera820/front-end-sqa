import styled from "styled-components";

const generarColor = () => {
  return "#" + Math.random().toString(16).substr(-6);
};

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

  img {
    width: 0.7rem;
    height: 0.7rem;
    &:hover {
      background-color: red;
      padding: 0.2rem;
    }
  }
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
