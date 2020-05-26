import React, { useState, useEffect } from "react";
import ItemHorario from "./itemHorario";
import axios from "axios";
import styled from "styled-components";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { withRouter } from "react-router-dom";
import {useSelector} from 'react-redux';
import Header from './header';
import { toast } from "react-toastify";

const Div = styled.div`
  margin-left: 10%;
  margin-right: 10%;
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


const VistaProfes = (props) => {
  const [ horario, setHorario ] = useState([]);
  const { history } = props;
  const estado = useSelector((state) => state);

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
    .get(`http://localhost/SGH-BackEnd/api/maestros/${estado.Usuario.Usuario}/horarios`)
    .then(response=>{
      response.data.data.mensaje!=="No se encontraron coincidencias" ? setHorario(response.data.data):notify("Todavía no tienes asginado un horario");
    })
    .catch(error=>console.log("no se pudo conectar con el servidor"));

  }, [estado,history]);
  

  const filtrar = () => {
    let asg = [
      ...new Set(
        horario.map((x) => {
          return {
            Clv_Materia: x.Clv_Materia,
            Clv_Grupo: x.Clv_Grupo,
          };
        })
      ),
    ];
    let set = new Set(asg.map(JSON.stringify));
    let arr = Array.from(set).map(JSON.parse);
    return arr;
  };

  const creartabla = () => {
    let asignaturas = filtrar();
    let aux = [];

    for (let i = 0; i < asignaturas.length; i++) {
      let hora = horario.filter(
        (x) =>
          x.Clv_Materia === asignaturas[i].Clv_Materia &&
          x.Clv_Grupo === asignaturas[i].Clv_Grupo
      );
      aux[i] = {
        Nombre: hora[0].Nombres,
        ApellidoM: hora[0].ApellidoM,
        ApellidoP: hora[0].ApellidoP,
        Clv_Materia: hora[0].Clv_Materia,
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

  useEffect(() => {
    /*axios.get("http://localhost/SGH-BackEnd/api/").then(response=>{
                setHorario(response.data.data);
        }).catch(error=>console.log("no se pudo conectar con el servidor"));*/
    console.log(materias);
  });

  return (
    <div>
      <Header/>
      <Div>
        <A>Consulta tu horario</A>
        <Table>
          <Thead>
            <Tr>
              <Th>Maestro</Th>
              <Th>Materia</Th>
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
                <Tr key={mat.Clv_Materia + " " + mat.Grupo}>
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
      </Div>
    </div>
  );
};

export default withRouter(VistaProfes);
