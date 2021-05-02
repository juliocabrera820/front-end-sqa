import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "../../estilos/SuperResponsiveTableStyle.css";
import maestrosService from '../../services/maestrosService'
import ItemHorario from "../../componentes/itemHorario";
import Header from "../../componentes/header";
import { toast } from "react-toastify";
import { Div, A } from "./styles";
import { useSession } from '../../shared/hooks/useSession'

toast.configure({
  autoClose: 4000,
  draggable: false,
  position: toast.POSITION.BOTTOM_RIGHT,
});

const VistaProfes = () => {
  const [horario, setHorario] = useState([]);
  const [session, setSession] = useSession()
  const { Usuario } = session()

  const notify = (error) =>
    toast(error, {
      type: toast.TYPE.WARNING,
      toastId: 1,
    });

  useEffect(() => {
      maestrosService().getHorario(Usuario)
      .then((response) => {
        response.data.data.mensaje !== "No se encontraron coincidencias"
          ? setHorario(response.data.data)
          : notify("Todavía no tienes asginado un horario");
      })
      .catch((error) => console.log("no se pudo conectar con el servidor"));
  }, []);

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
        aux[i][hora[j].Dia]["Aula"] = hora[j].Aula;
        aux[i][hora[j].Dia]["HoraI"] = hora[j].HInicio;
        aux[i][hora[j].Dia]["HoraF"] = hora[j].HFinal;
      }
    }
    console.log(aux);
    return aux;
  };

  const formatoH = (hora) => {
    return hora.slice(0, -3);
  };

  const materias = creartabla();

  return (
    <div>
      <Header />
      <Div>
        <A>Consulta tu horario</A>
        <Table>
          <Thead>
            <Tr>
              <Th>Materia</Th>
              <Th>Maestro</Th>
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
                <Tr key={materia.Clv_materiaeria + " " + materia.Grupo}>
                  <Td>{materia.Materia}</Td>
                  <Td>
                    {materia.Nombre +
                      " " +
                      materia.ApellidoM +
                      " " +
                      materia.ApellidoP}
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
                        materia.Nombre +
                        " " +
                        materia.ApellidoM +
                        " " +
                        materia.ApellidoP
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
                        materia.Nombre +
                        " " +
                        materia.ApellidoM +
                        " " +
                        materia.ApellidoP
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
                        materia.Nombre +
                        " " +
                        materia.ApellidoM +
                        " " +
                        materia.ApellidoP
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
                        materia.Nombre +
                        " " +
                        materia.ApellidoM +
                        " " +
                        materia.ApellidoP
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
                        materia.Nombre +
                        " " +
                        materia.ApellidoM +
                        " " +
                        materia.ApellidoP
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
