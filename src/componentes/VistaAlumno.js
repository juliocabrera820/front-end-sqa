import React, { useState, useEffect } from "react";
import ItemHorario from "./itemHorario";
import axios from "axios";
import styled from "styled-components";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from './header';
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
  opacity: .85;
`;

toast.configure({
  autoClose: 4000,
  draggable: false,
  position: toast.POSITION.BOTTOM_RIGHT,
});

const VistaAlumno = (props) => {
  
  const estado = useSelector((state) => state);
  const { history } = props;
  const [ horario, setHorario ] = useState([]);
  
  const notify = (error) =>
  toast(error, {
    type: toast.TYPE.WARNING,
    toastId: 1,
  });

  useEffect(() => {
    if (estado.Usuario === "No hay usuario") {
      history.push("/");
    }

    axios
    .get(`http://localhost/SGH-BackEnd/api/alumnos/${estado.Usuario.Usuario}/horarios`)
    .then(response=>{
      response.data.data.mensaje!=="No se encontraron coincidencias" ? setHorario(response.data.data):notify("Todavía no tienes asginado un horario");
    })
    .catch(error=>console.log("no se pudo conectar con el servidor"));
  }, [estado,history]);

  const creartabla = () => {
    const asg = [...new Set(horario.map((x) => x.Clv_materia))];
    let aux = new Array();
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
    <div>
      <div>
        <Header/>
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
      </div>
    </div>
  );
};

export default withRouter(VistaAlumno);
