import styled from "styled-components";

export const Content = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f8f8f8;
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .link {
    text-decoration: none;
    color: black;
  }
`;

export const Title = styled.h1`
  text-align: center;
  background-color: #fce4d1;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #fce4d1;
  width: 14rem;
  height: 16rem;
  margin: 1rem;
  text-align: center;
`;

export const Image = styled.img`
  width: 5rem;
  height: 5rem;
`;

export const Button = styled.button`
  border: none;
  background-color: ${(props) => (props ? "green" : "red")};
  color: white;
  &:hover {
    background-color: #da2c6b;
  }
  margin-top: ${(props) => (props ? "1rem" : "0rem")};
  &:focus {
    outline: none;
  }
`;
