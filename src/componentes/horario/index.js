import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import ItemHorario from "../../componentes/itemHorario";
import { useUser } from "../../shared/hooks/useUser";
import { BASE_API_URL } from "../../shared/consts/envar";
import axios from "axios";
import notificacion from "../../componentes/notificacion";

export const HorarioStyled = styled.div`
  margin: 4rem 5% 5% 5%;
`;

export const A = styled.div`
  font-family: "Yanone Kaffeesatz", sans-serif;
  font-size: 2em;
  opacity: 0.85;
`;

const Horario = () => {
  const [currentSchedule, setcurrentSchedule] = useState([]);
  const { currentGroup } = useSelector((state) => state.group);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, token } = useUser();

  useEffect(() => {
    setcurrentSchedule([]);
    if (currentGroup) {
      getSchedule();
    }
  }, [currentGroup]);

  const getSchedule = () => {
    setIsLoading(true);
    axios({
      baseURL: BASE_API_URL,
      method: "GET",
      url: `/grupos/${currentGroup}/horarios`,
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      setcurrentSchedule(response.data);
      setIsLoading(false);
    });
  };
  const formatoH = (hora) => {
    return hora?.slice(0, 5);
  };

  const eliminar = (id) => {
    console.log(id);
    var result = window.confirm("Está seguro de eliminar este horario?");
    if (result) {
      axios({
        baseURL: BASE_API_URL,
        method: "DELETE",
        url: `http://localhost:8080/api/horarios/${id}`,
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        setcurrentSchedule([]);
        getSchedule();
        notificacion("El horarios se ha eliminado", "warning", 1);
      });
    }
  };
  return (
    <HorarioStyled>
      <A>Horario del grupo: {currentGroup}</A>
      <Table>
        <Thead>
          <Tr>
            <Th>Asignatura</Th>
            <Th>Profesor</Th>
            <Th>Grupo</Th>
            <Th>Lunes</Th>
            <Th>Martes</Th>
            <Th>Miercoles</Th>
            <Th>Jueves</Th>
            <Th>Viernes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <tr>
              <td colSpan="8">CARGANDO... </td>
            </tr>
          ) : null}
          {currentSchedule?.map((materia) => {
            return (
              <Tr key={materia?.materia}>
                <Td>{materia?.materia}</Td>
                <Td>{`${materia?.maestro}`}</Td>
                <Td>{materia?.grupo}</Td>
                <Td>
                  <ItemHorario
                    id={materia.Lunes?.id}
                    hora={`${formatoH(materia.Lunes?.hInicio)}-${formatoH(
                      materia.Lunes?.hFinal
                    )}`}
                    aula={materia.Lunes?.aula}
                    profesor={`${materia.maestro}`}
                    eliminar={eliminar}
                  />
                </Td>
                <Td>
                  <ItemHorario
                    id={materia.Martes?.id}
                    hora={`${formatoH(materia.Martes?.hInicio)}-${formatoH(
                      materia.Martes?.hFinal
                    )}`}
                    aula={materia.Martes?.aula}
                    profesor={`${materia.maestro}`}
                    eliminar={eliminar}
                  />
                </Td>
                <Td>
                  <ItemHorario
                    id={materia.Miercoles?.id}
                    hora={`${formatoH(materia.Miercoles?.hInicio)}-${formatoH(
                      materia.Miercoles?.hFinal
                    )}`}
                    aula={materia.Miercoles?.aula}
                    profesor={`${materia.maestro}`}
                    eliminar={eliminar}
                  />
                </Td>
                <Td>
                  <ItemHorario
                    id={materia.Jueves?.id}
                    hora={`${formatoH(materia.Jueves?.hInicio)}-${formatoH(
                      materia.Jueves?.hFinal
                    )}`}
                    aula={materia.Jueves?.aula}
                    profesor={`${materia.maestro}`}
                    eliminar={eliminar}
                  />
                </Td>
                <Td>
                  <ItemHorario
                    id={materia.Viernes?.id}
                    hora={`${formatoH(materia.Viernes?.hInicio)}-${formatoH(
                      materia.Viernes?.hFinal
                    )}`}
                    aula={materia.Viernes?.aula}
                    profesor={`${materia.maestro}`}
                    eliminar={eliminar}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </HorarioStyled>
  );
};

export default Horario;
