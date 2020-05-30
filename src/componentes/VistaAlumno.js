import React, { useState, useEffect } from "react";
import ItemHorario from "./itemHorario";
import axios from "axios";
import styled from "styled-components";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "./header";
import { toast } from "react-toastify";

const Horario = styled.div`
  margin-left: 10%;
  margin-right: 10%;
`;

const Grupo = styled.td`
  border: 1px solid black;
  width: 9%;
  padding: 10px;
  border-radius: 3px;
  background-color: #e7e3e2;
  border: #b2b2b0 1px solid;
`;

const A=styled.div`
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-size: 2em;
  opacity: 0.85;
`;

const VistaAlumno = (props) => {
  const estado = useSelector((state) => state);
  const { history } = props;
  const [horario, setHorario] = useState([]);

  const notify = (error) =>
    toast(error, {
      type: toast.TYPE.WARNING,
      toastId: 1,
    });

  useEffect(() => {
    if (estado.Usuario === "No hay usuario") {
      history.push("/");
    }
  }, []);

    axios
      .get(
        `http://localhost/SGH-BackEnd/api/alumnos/${estado.Usuario.Usuario}/horarios`
      )
      .then((response) => {
        response.data.data.mensaje !== "No se encontraron coincidencias"
          ? setHorario(response.data.data)
          : notify("Todavía no tienes asginado un horario");
      })
      .catch((error) => console.log("no se pudo conectar con el servidor"));
  }, [estado, history]);

  const creartabla = () => {
    let aux = new Array();
    for (let i = 0; i < asg.length; i++) {
      let hora = horarios.filter((x) => x.Clv_Materia === asg[i]);
      aux[i] = {
        Nombre: hora[0].Nombres,
        ApellidoM: hora[0].ApellidoM,
        ApellidoP: hora[0].ApellidoP,
        Clv_Materia: hora[0].Clv_Materia,
        Materia: hora[0].Materia,
        Grupo: "GrupoA",
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
    //console.log(aux);
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
                      {materia.Nombre + " " + materia.ApellidoM + " " + materia.ApellidoP}
                    </Td>
                    <Td>{materia.Grupo}</Td>
                    <Td>
                      <ItemHorario
                        hora={
                          formatoH(materia.Lunes.HoraI) +
                          "-" +
                          formatoH(materia.Lunes.HoraF)
                        }
                        aula={materia.Lunes.Aula}
                        profesor={
                          materia.Nombre + " " + materia.ApellidoM + " " + materia.ApellidoP
                        }
                      />
                    </Td>
                    <Td>
                      <ItemHorario
                        hora={
                          formatoH(materia.Martes.HoraI) +
                          "-" +
                          formatoH(materia.Martes.HoraF)
                        }
                        aula={materia.Martes.Aula}
                        profesor={
                          materia.Nombre + " " + materia.ApellidoM + " " + materia.ApellidoP
                        }
                      />
                    </Td>
                    <Td>
                      <ItemHorario
                        hora={
                          formatoH(materia.Miercoles.HoraI) +
                          "-" +
                          formatoH(materia.Miercoles.HoraF)
                        }
                        aula={materia.Miercoles.Aula}
                        profesor={
                          materia.Nombre + " " + materia.ApellidoM + " " + materia.ApellidoP
                        }
                      />
                    </Td>
                    <Td>
                      <ItemHorario
                        hora={
                          formatoH(materia.Jueves.HoraI) +
                          "-" +
                          formatoH(materia.Jueves.HoraF)
                        }
                        aula={materia.Jueves.Aula}
                        profesor={
                          materia.Nombre + " " + materia.ApellidoM + " " + materia.ApellidoP
                        }
                      />
                    </Td>
                    <Td>
                      <ItemHorario
                        hora={
                          formatoH(materia.Viernes.HoraI) +
                          "-" +
                          formatoH(materia.Viernes.HoraF)
                        }
                        aula={materia.Viernes.Aula}
                        profesor={
                          materia.Nombre + " " + materia.ApellidoM + " " + materia.ApellidoP
                        }
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

export default withRouter(VistaAlumno);
