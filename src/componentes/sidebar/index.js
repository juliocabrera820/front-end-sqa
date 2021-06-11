import React, { useState } from "react";
import styled from "styled-components";
import menu from "../../assets/list.svg";
import close from "../../assets/close.svg";

const Img = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  position: fixed;
  top: 1.5rem;
  left: 1rem;
  cursor: pointer;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  top: 0px;
  position: fixed;
  background-color: rgba(217, 217, 217, 0.4);
  display: ${(props) => (props.isActive ? "block" : "none")};
  transition: transform 01.3s ease;
`;

const SidebarStyled = styled.aside`
  width: 250px;
  background-color: #c9c9bb;
  height: 100vh;
  top: 0px;
  position: fixed;
  transform: ${(props) =>
    props.isActive ? "translate(0rem);" : "translate(-250px);"};
  display: flex;
  flex-direction: column;
  .menu-title {
    font-size: 2rem;
    margin: 20% 0rem 10% 0rem;
  }
  .menu-title,
  .menu-item {
    font-weight: bold;
    color: black;
    text-align: center;
  }

  .menu-item {
    font-size: 1.3rem;
    margin: 1rem 0rem 1rem 0rem;
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
    position: fixed;
    top: 1.5rem;
    left: 200px;
    cursor: pointer;
  }
`;

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const handleOpen = () => {
    setActive(true);
  };

  const handleClose = () => {
    setActive(false);
  };
  return (
    <React.Fragment>
      <Img className="menu" src={menu} onClick={handleOpen} />
      <Container isActive={isActive} onClick={handleClose}>
        <SidebarStyled isActive={isActive}>
          <img src={close} onClick={handleClose} />
          <p id="home" className="menu-title">
            Menú
          </p>
          <a id="about" className="menu-item" href="/grupos">
            Administrar Grupos
          </a>
          <a id="contact" className="menu-item" href="/administrador">
            Crear Horarios
          </a>
        </SidebarStyled>
      </Container>
    </React.Fragment>
  );
};

export default Sidebar;
