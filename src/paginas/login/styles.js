import styled from "styled-components";

export const Img = styled.img`
  object-fit: cover;
  object-position: center center;
  width: 100%;
  height: 100vh;
  @media (max-width: 991px) {
    width: 98%;
    position: absolute;
    opacity: 0.3;
  }
  @media (max-width: 768px) {
    width: 95%;
  }
`;

export const Titulo = styled.div`
  font-family: "Yanone Kaffeesatz", sans-serif;
  font-size: 60px;
  opacity: 0.8;
`;

export const Cuerpo = styled.div`
  font-family: "Yanone Kaffeesatz", sans-serif;
  font-size: 30px;
  opacity: 0.8;
  margin-bottom: 10px;
`;

export const Seccion = styled.div``;

export const InputF = styled.div`
  padding: 15px;
  margin-left: 3%;
  box-shadow: 0px 0px 10px 0.1px #e1e1e1;
  background: white;
  margin-bottom: 0px;
`;

export const Input = styled.input`
  border: none;
`;

export const Button = styled.button`
  margin-top: 20px;
  font-family: "Yanone Kaffeesatz", sans-serif;
  font-size: 20px;
  background: white;
  border: none;
  color: black;
`;

export const Formato = styled.div`
  background: #8f6464;
  border-radius: 10px;
  margin: 0px;
  padding: 0px;
  font-family: "Yanone Kaffeesatz", sans-serif;
  font-size: 20px;
`;
