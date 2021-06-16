import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Header from "../../componentes/header";
import Sidebar from "../../componentes/sidebar";
import { BASE_API_URL } from "../../shared/consts/envar";
import { useUser } from "../../shared/hooks/useUser";
import axios from "axios";
import studentImage from "../../assets/student.png";
import Notify from "../../componentes/notificacion";
import { getGroups } from "../../redux/actions/groupAction";
import { Button, Container, Content, Image, Item, Title } from "./styles";

const ListStudents = () => {
  const { id } = useParams();
  const { token } = useUser();
  const { groups } = useSelector((state) => state.group);

  const [students, setstudents] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentGroup, setCurrentGroup] = useState("GrupoA");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroups(token));
    getStudents();
  }, []);

  const getStudents = () => {
    setIsLoading(true);
    axios({
      baseURL: BASE_API_URL,
      method: "GET",
      url: `/alumnos?grupo=${id}`,
      headers: { Authorization: token },
    })
      .then((response) => {
        if (response.data !== "No hay alumnos con grupo nulo") {
          setstudents(response.data);
        } else {
          Notify("No hay alumnos", "warning", 1);
        }

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        Notify("No hay alumnos", "warning", 1);
      });
  };

  const deleteStudent = (studentId) => {
    let response = window.confirm(`Desea eliminar este alumno del ${id}`);
    if (response) {
      setIsLoading(true);
      axios({
        baseURL: BASE_API_URL,
        method: "DELETE",
        url: `alumnos/${studentId}/grupos/${id}`,
        headers: { Authorization: token },
      })
        .then((response) => {
          Notify(response.data.mensaje, "success", 1);
          getStudents();
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          Notify("No se pudo eliminar el alumno del grupo", "error", 1);
        });
    }
  };

  const addGroup = (studentId) => {
    let response = window.confirm(
      `Deseas agregar a Alumno ${studentId} al grupo ${currentGroup}`
    );

    if (response) {
      axios({
        baseURL: BASE_API_URL,
        method: "POST",
        url: `alumnos/${studentId}`,
        headers: { Authorization: token },
        data: { clvGrupo: currentGroup },
      })
        .then((response) => {
          Notify(response.data.mensaje, "success", 1);
          getStudents();
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          Notify("No se pudo Agregar el alumno al grupo", "error", 1);
        });
    }
  };

  return (
    <React.Fragment>
      <Header />
      <Sidebar />
      <Content>
        {id === "null" ? (
          <Title>Lista de alumnos sin grupo asignado</Title>
        ) : (
          <Title>Lista de alumnos del {id}</Title>
        )}

        <Container>
          {!isLoading ? (
            students?.map((student) => {
              if (id === "null") {
                return (
                  <Item key={student.Matricula}>
                    <Image src={studentImage}></Image>
                    <p>
                      <strong>Nombre: </strong>
                      {`${student.Nombre} ${student.Apellido}`}
                    </p>
                    <p>
                      <strong>Matricula: </strong>
                      {student.Matricula}
                    </p>
                    <select
                      onChange={(e) => setCurrentGroup(e.currentTarget.value)}
                      value={currentGroup || "GrupoA"}
                    >
                      {groups?.map((grupo) => {
                        return (
                          <option key={grupo.nombre} value={grupo.nombre}>
                            {grupo.nombre}
                          </option>
                        );
                      })}
                    </select>
                    <Button group onClick={() => addGroup(student.Matricula)}>
                      Asignar
                    </Button>
                  </Item>
                );
              } else {
                return (
                  <Item key={student.Matricula}>
                    <Image src={studentImage}></Image>
                    <p>
                      <strong>Nombre: </strong>
                      {`${student.Nombre} ${student.Apellido}`}
                    </p>
                    <p>
                      <strong>Matricula: </strong>
                      {student.Matricula}
                    </p>
                    <Button onClick={() => deleteStudent(student.Matricula)}>
                      Eliminar
                    </Button>
                  </Item>
                );
              }
            })
          ) : (
            <h1>Cargando</h1>
          )}
        </Container>
      </Content>
    </React.Fragment>
  );
};

export default ListStudents;
