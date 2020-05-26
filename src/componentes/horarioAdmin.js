import React, { useState, useEffect } from "react";
import ItemHorario from "./itemHorario";
import axios from "axios";
import styled from "styled-components";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { withRouter } from "react-router-dom";

const Horario = styled.div`
    margin-top: 40px;
    margin-left: 5%;
    margin-right: 5%;
`;

const A=styled.div`
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-size: 2em;
  opacity: .85;
`;


const HorarioAdmin = (props) => {

  const { history } = props;
  const [ horario, setHorario ] = useState([]);
  

  useEffect(() => {
    axios
    .get(`http://localhost/SGH-BackEnd/api/alumnos/13008092/horarios`)
    .then(response=>{
      response.data.data.mensaje!=="No se encontraron coincidencias" ? setHorario(response.data.data):console.log();
    })
    .catch(error=>console.log("no se pudo conectar con el servidor"));
  }, [history]);

  const creartabla = () => {
    const asg = [...new Set(horario.map((x) => x.Clv_materia))];
    let aux = [];
    console.log(horario);
    for (let i = 0; i < asg.length; i++) {
      let hora = horario.filter((x) => x.Clv_materia === asg[i]);
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
        <Horario>
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
              {materias.map((mat) => {
                return (
                  <Tr key={mat.Clv_Materia}>
                    <Td>{mat.Materia}</Td>
                    <Td>
                      {mat.Nombre + " " + mat.ApellidoM + " " + mat.ApellidoP}
                    </Td>
                    <Td>{mat.Grupo}</Td>
                    <Td>
                      <ItemHorario
                        hora={
                          formatoH(mat.Lunes.HoraI) +
                          "-" +
                          formatoH(mat.Lunes.HoraF)
                        }
                        aula={mat.Lunes.Aula}
                        profesor={
                          mat.Nombre + " " + mat.ApellidoM + " " + mat.ApellidoP
                        }
                      />
                    </Td>
                    <Td>
                      <ItemHorario
                        hora={
                          formatoH(mat.Martes.HoraI) +
                          "-" +
                          formatoH(mat.Martes.HoraF)
                        }
                        aula={mat.Martes.Aula}
                        profesor={
                          mat.Nombre + " " + mat.ApellidoM + " " + mat.ApellidoP
                        }
                      />
                    </Td>
                    <Td>
                      <ItemHorario
                        hora={
                          formatoH(mat.Miercoles.HoraI) +
                          "-" +
                          formatoH(mat.Miercoles.HoraF)
                        }
                        aula={mat.Miercoles.Aula}
                        profesor={
                          mat.Nombre + " " + mat.ApellidoM + " " + mat.ApellidoP
                        }
                      />
                    </Td>
                    <Td>
                      <ItemHorario
                        hora={
                          formatoH(mat.Jueves.HoraI) +
                          "-" +
                          formatoH(mat.Jueves.HoraF)
                        }
                        aula={mat.Jueves.Aula}
                        profesor={
                          mat.Nombre + " " + mat.ApellidoM + " " + mat.ApellidoP
                        }
                      />
                    </Td>
                    <Td>
                      <ItemHorario
                        hora={
                          formatoH(mat.Viernes.HoraI) +
                          "-" +
                          formatoH(mat.Viernes.HoraF)
                        }
                        aula={mat.Viernes.Aula}
                        profesor={
                          mat.Nombre + " " + mat.ApellidoM + " " + mat.ApellidoP
                        }
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Horario>
  );
};

export default withRouter(HorarioAdmin);