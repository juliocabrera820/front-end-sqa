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

export const Card = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: #fcfee9;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  &:hover {
    background-color: #fce4d1;
  }
`;

export const Image = styled.img`
  width: 8rem;
  height: 8rem;
`;
