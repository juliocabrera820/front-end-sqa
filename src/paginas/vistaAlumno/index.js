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

const VistaAlumno = () => {
  const { currentUser, isLoading, redirectTo } = useUser();
  const { currentSchedule } = useSelector((state) => state.schedule);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSchedule(currentUser.Usuario, "alumnos"));
  }, []);

  const creartabla = () => {
    const asg = [...new Set(currentSchedule?.map((x) => x.Clv_materia))];
    let aux = [];
    console.log(currentSchedule);
    for (let i = 0; i < asg.length; i++) {
      let hora = currentSchedule.filter((x) => x.Clv_materia === asg[i]);
      aux[i] = {
        Nombre: hora[0].Nombres,
        ApellidoM: hora[0].ApellidoM,
        ApellidoP: hora[0].ApellidoP,
        Clv_Materia: hora[0].Clv_materia,
        Materia: hora[0].Materia,
        Grupo: hora[0].Clv_Grupo,
        Lunes: {
          Aula: "",
          HoraI: "",
          HoraF: "",
        },
        Martes: {
          Aula: "",
          HoraI: "",
          HoraF: "",
        },
        Miercoles: {
          Aula: "",
          HoraI: "",
          HoraF: "",
        },
        Jueves: {
          Aula: "",
          HoraI: "",
          HoraF: "",
        },
        Viernes: {
          Aula: "",
          HoraI: "",
          HoraF: "",
        },
      };
      for (let j = 0; j < hora.length; j++) {
        aux[i][hora[j].Dia]["Aula"] = hora[j].aula;
        aux[i][hora[j].Dia]["HoraI"] = hora[j].HInicio;
        aux[i][hora[j].Dia]["HoraF"] = hora[j].HFinal;
      }
    }
    return aux;
  };

  const formatoH = (hora) => {
    return hora.slice(0, -3);
  };

  const materias = creartabla();
  return (
    <div>
      <div>
        <Header />
        <Horario>
          <A>Consulta tu horario</A>
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
              {materias.map((materia) => {
                return (
                  <Tr key={materia.Clv_Materia}>
                    <Td>{materia.Materia}</Td>
                    <Td>
                      {`${materia.Nombre} ${materia.ApellidoM} ${materia.ApellidoP}`}
                    </Td>
                    <Td>{materia.Grupo}</Td>
                    <Td>
                      <ItemHorario
                        hora={`${formatoH(materia.Lunes.HoraI)}-${formatoH(
                          materia.Lunes.HoraF
                        )}`}
                        aula={materia.Lunes.Aula}
                        profesor={`${materia.Nombre} ${materia.ApellidoM} ${materia.ApellidoP}`}
                      />
                    </Td>
                    <Td>
                      <ItemHorario
                        hora={`${formatoH(materia.Martes.HoraI)}-${formatoH(
                          materia.Martes.HoraF
                        )}`}
                        aula={materia.Martes.Aula}
                        profesor={`${materia.Nombre} ${materia.ApellidoM} ${materia.ApellidoP}`}
                      />
                    </Td>
                    <Td>
                      <ItemHorario
                        hora={`${formatoH(materia.Miercoles.HoraI)}-${formatoH(
                          materia.Miercoles.HoraF
                        )}`}
                        aula={materia.Miercoles.Aula}
                        profesor={`${materia.Nombre} ${materia.ApellidoM} ${materia.ApellidoP}`}
                      />
                    </Td>
                    <Td>
                      <ItemHorario
                        hora={`${formatoH(materia.Jueves.HoraI)}-${formatoH(
                          materia.Jueves.HoraF
                        )}`}
                        aula={materia.Jueves.Aula}
                        profesor={`${materia.Nombre} ${materia.ApellidoM} ${materia.ApellidoP}`}
                      />
                    </Td>
                    <Td>
                      <ItemHorario
                        hora={`${formatoH(materia.Viernes.HoraI)}-${formatoH(
                          materia.Viernes.HoraF
                        )}`}
                        aula={materia.Viernes.Aula}
                        profesor={`${materia.Nombre} ${materia.ApellidoM} ${materia.ApellidoP}`}
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
