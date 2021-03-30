import styled from "styled-components";
import { titles } from "../../shared/consts/fonts";

export const Item = styled.div`
  font-family: ${titles};
  text-align: center;
  border-radius: 5px;
  margin: 0px;
  margin-bottom: 20px;
  font-size: 1.5em;
  height: 60px;
  background-color: #9d81b3;
`;

export const Div = styled.div`
  padding-top: 10px;
  border: solid 1px #e8e6ca;
  background-color: #fcfee9;
  margin-left: 5px;
  height: 60px;
  &:hover {
    background-color: #d1e8ff;
  }
  cursor: pointer;
`;
