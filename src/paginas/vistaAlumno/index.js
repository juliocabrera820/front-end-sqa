import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "../../estilos/SuperResponsiveTableStyle.css";
import { getSchedule } from "../../redux/actions/scheduleAction";
import ItemHorario from "../../componentes/itemHorario";
import Header from "../../componentes/header";
import { Horario, A } from "./styles";
import { useUser } from "../../shared/hooks/useUser";
import alumnosService from "../../services/alumnosService";

const VistaAlumno = () => {
  const { currentUser, token } = useUser();
  const { currentSchedule, isLoading } = useSelector((state) => state.schedule);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSchedule(currentUser.id, token, "alumnos"));
  }, []);

  const formatoH = (hora) => {
    return hora?.slice(0, 5);
  };

  const generatePDF = () => {
    alumnosService()
      .generatePDF(currentUser.id, token)
      .then((response) => goToSchedule(response.data))
      .catch((error) => console.log(error));
  };

  const goToSchedule = ({ link }) => {
    window.open(link, '_blank')
  };

  return (
    <div>
      <div>
        <Header />
        <Horario>
          <A>Consulta tu horario</A>
          <button
            onClick={generatePDF}
            disabled={!currentSchedule}
            className="btn btn-outline-dark mb-3"
          >
            Generar Horario
          </button>
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
                <td colSpan="8">
                  <h1>CARGANDO... </h1>
                </td>
              ) : null}
              {currentSchedule?.map((materia) => {
                return (
                  <Tr key={materia?.materia}>
                    <Td>{materia?.materia}</Td>
                    <Td>{`${materia?.maestro}`}</Td>
                    <Td>{materia?.grupo}</Td>
                    <Td>
                      <ItemHorario
                        hora={`${formatoH(materia.Lunes?.hInicio)}-${formatoH(
                          materia.Lunes?.hFinal
                        )}`}
                        aula={materia.Lunes?.aula}
                        profesor={`${materia.maestro}`}
                      />
                    </Td>
                    <Td>
                      <ItemHorario
                        hora={`${formatoH(materia.Martes?.hInicio)}-${formatoH(
                          materia.Martes?.hFinal
                        )}`}
                        aula={materia.Martes?.aula}
                        profesor={`${materia.maestro}`}
                      />
                    </Td>
                    <Td>
                      <ItemHorario
                        hora={`${formatoH(
                          materia.Miercoles?.hInicio
                        )}-${formatoH(materia.Miercoles?.hFinal)}`}
                        aula={materia.Miercoles?.aula}
                        profesor={`${materia.maestro}`}
                      />
                    </Td>
                    <Td>
                      <ItemHorario
                        hora={`${formatoH(materia.Jueves?.hInicio)}-${formatoH(
                          materia.Jueves?.hFinal
                        )}`}
                        aula={materia.Jueves?.aula}
                        profesor={`${materia.maestro}`}
                      />
                    </Td>
                    <Td>
                      <ItemHorario
                        hora={`${formatoH(materia.Viernes?.hInicio)}-${formatoH(
                          materia.Viernes?.hFinal
                        )}`}
                        aula={materia.Viernes?.aula}
                        profesor={`${materia.maestro}`}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Horario>
      </div>
    </div>
  );
};

export default VistaAlumno;
