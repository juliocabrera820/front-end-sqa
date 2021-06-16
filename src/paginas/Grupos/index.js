import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Header from "../../componentes/header";
import Sidebar from "../../componentes/sidebar";
import { useUser } from "../../shared/hooks/useUser";
import { getGroups } from "../../redux/actions/groupAction";
import groupImage from "../../assets/group.png";
import { Link } from "react-router-dom";
import { Card, Container, Content, Image, Title } from "./styles";

const Groups = () => {
  const { currentUser, token } = useUser();
  const { groups } = useSelector((state) => state.group);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroups(token));
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />
      <Content>
        <main>
          <Title>GRUPOS</Title>
          <Container>
            {groups ? (
              groups?.map((group) => {
                return (
                  <Link
                    key={group.nombre}
                    className="link"
                    to={`/grupo/${group.nombre}`}
                  >
                    <Card>
                      <Image src={groupImage} />
                      <p>{group.nombre}</p>
                    </Card>
                  </Link>
                );
              })
            ) : (
              <p>Cargando</p>
            )}
            {groups ? (
              <Link className="link" to={`/grupo/null`}>
                <Card>
                  <Image src={groupImage} />
                  <p>Sin grupo asignado</p>
                </Card>
              </Link>
            ) : null}
          </Container>
        </main>
      </Content>
    </div>
  );
};

export default Groups;
