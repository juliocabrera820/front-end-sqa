import React, { useState,useEffect } from 'react';
import ItemHorario from './itemHorario';
import axios from 'axios'
import styled from 'styled-components'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'



const Div = styled.div`
    margin-left: 10%;
    margin-right: 10%;
`;
const Grupo = styled.td`
    border: 1px solid black;
    width: 9%;
    padding: 10px;
    border-radius: 3px;
    background-color: #e7e3e2;
    border : #b2b2b0 1px solid;
`;

const VistaProfes = () => {

    const {horario, setHorario} = useState();
    const horarios=[
        {
            "Clv_Horario":1,
            "Clv_Grupo":"GrupoA",
            "Clv_Carreta":"LIS",
            "Clv_Materia":"QA",
            "Materia":"Aseguramiento de la calidad",
            "aula":"D1",
            "HInicio":"07:30:00",
            "HFinal":"08:30:00",
            "Dia":"Lunes",
            "Nombres":"Carlos Benito",
            "ApellidoM":"Mojica",
            "ApellidoP":"Ruiz"
        },
        {
            "Clv_Horario":2,
            "Clv_Grupo":"GrupoA",
            "Clv_Carreta":"LIS",
            "Clv_Materia":"QA",
            "Materia":"Aseguramiento de la calidad",
            "aula":"D1",
            "HInicio":"07:30:00",
            "HFinal":"08:30:00",
            "Dia":"Martes",
            "Nombres":"Carlos Benito",
            "ApellidoM":"Mojica",
            "ApellidoP":"Ruiz"
        },
        {
            "Clv_Horario":3,
            "Clv_Grupo":"GrupoA",
            "Clv_Carreta":"LIS",
            "Clv_Materia":"QA",
            "Materia":"Aseguramiento de la calidad",
            "aula":"D1",
            "HInicio":"07:30:00",
            "HFinal":"08:30:00",
            "Dia":"Miercoles",
            "Nombres":"Carlos Benito",
            "ApellidoM":"Mojica",
            "ApellidoP":"Ruiz"
        },
        {
            "Clv_Horario":4,
            "Clv_Grupo":"GrupoA",
            "Clv_Carreta":"LIS",
            "Clv_Materia":"QA",
            "Materia":"Aseguramiento de la calidad",
            "aula":"D1",
            "HInicio":"07:30:00",
            "HFinal":"08:30:00",
            "Dia":"Jueves",
            "Nombres":"Carlos Benito",
            "ApellidoM":"Mojica",
            "ApellidoP":"Ruiz"
        },
        {
            "Clv_Horario":5,
            "Clv_Grupo":"GrupoB",
            "Clv_Carreta":"LIS",
            "Clv_Materia":"QA",
            "Materia":"Aseguramiento de la calidad",
            "aula":"D1",
            "HInicio":"04:30:00",
            "HFinal":"4:30:00",
            "Dia":"Viernes",
            "Nombres":"Carlos Benito",
            "ApellidoM":"Mojica",
            "ApellidoP":"Ruiz"
        },
        {
            "Clv_Horario":6,
            "Clv_Grupo":"GrupoB",
            "Clv_Carreta":"LIS",
            "Clv_Materia":"CS",
            "Materia":"Construccion de software",
            "aula":"D1",
            "HInicio":"08:30:00",
            "HFinal":"10:30:00",
            "Dia":"Viernes",
            "Nombres":"Carlos Benito",
            "ApellidoM":"Mojica",
            "ApellidoP":"Ruiz"
        },
    ];
    

    
    const filtrar = () => {
        let asg =[... new Set(horarios.map(x=>{
            return {
                "Clv_Materia":x.Clv_Materia,
                "Clv_Grupo":x.Clv_Grupo
            }
        }))]
        let set = new Set( asg.map( JSON.stringify ) )
        let arr = Array.from( set ).map( JSON.parse );
        return arr;
    }

    const creartabla=()=>{
        let asignaturas = filtrar();
        let aux = [];

        for(let i = 0; i<asignaturas.length; i++){
            let hora = horarios.filter(x=>x.Clv_Materia===asignaturas[i].Clv_Materia && x.Clv_Grupo===asignaturas[i].Clv_Grupo);
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

            for(let j = 0; j<hora.length; j++){
                aux[i][hora[j].Dia]["Aula"]=hora[j].aula;
                aux[i][hora[j].Dia]["HoraI"]=hora[j].HInicio;
                aux[i][hora[j].Dia]["HoraF"]=hora[j].HFinal;
            }

        }

        return aux;
    }

    const generarColor= ()=> {
        return '#' +  Math.random().toString(16).substr(-6);
    }

    const formatoH = (hora)=>{
        return hora.slice(0,-3);
    }

    const materias = creartabla();

    useEffect(() => {
        /*axios.get("http://localhost/SGH-BackEnd/api/").then(response=>{
                setHorario(response.data.data);
        }).catch(error=>console.log("no se pudo conectar con el servidor"));*/
        console.log(materias);
    });

    return (
        <div>
            <Div>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Maestro</Th>
                            <Th>Materia</Th>
                            <Grupo>Grupo</Grupo>
                            <Th>Lunes</Th>
                            <Th>Martes</Th>
                            <Th>Miercoles</Th>
                            <Th>Jueves</Th>
                            <Th>Viernes</Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                        {
                            materias.map((mat) => {
                                return( 
                                <Tr key={mat.Clv_Materia+" "+mat.Grupo}>
                                    <Td>{mat.Materia}</Td>
                                    <Td>{mat.Nombre + " " + mat.ApellidoM + " " + mat.ApellidoP}</Td>
                                    <Grupo>{mat.Grupo}</Grupo>
                                    <Td><ItemHorario
                                        hora={formatoH(mat.Lunes.HoraI) + "-" + formatoH(mat.Lunes.HoraF)}
                                        aula={mat.Lunes.Aula}
                                        profesor={mat.Nombre + " " + mat.ApellidoM + " " + mat.ApellidoP} />
                                    </Td>
                                    <Td><ItemHorario
                                        hora={formatoH(mat.Martes.HoraI) + "-" + formatoH(mat.Martes.HoraF)}
                                        aula={mat.Martes.Aula}
                                        profesor={mat.Nombre + " " + mat.ApellidoM + " " + mat.ApellidoP} />
                                    </Td>
                                    <Td><ItemHorario
                                        hora={formatoH(mat.Miercoles.HoraI) + "-" + formatoH(mat.Miercoles.HoraF)}
                                        aula={mat.Miercoles.Aula}
                                        profesor={mat.Nombre + " " + mat.ApellidoM + " " + mat.ApellidoP} />
                                    </Td>
                                    <Td><ItemHorario
                                        hora={formatoH(mat.Jueves.HoraI) + "-" + formatoH(mat.Jueves.HoraF)}
                                        aula={mat.Jueves.Aula}
                                        profesor={mat.Nombre + " " + mat.ApellidoM + " " + mat.ApellidoP} />
                                    </Td>
                                    <Td><ItemHorario
                                        hora={formatoH(mat.Viernes.HoraI) + "-" + formatoH(mat.Viernes.HoraF)}
                                        aula={mat.Viernes.Aula}
                                        profesor={mat.Nombre + " " + mat.ApellidoM + " " + mat.ApellidoP} />
                                    </Td>
                                </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </Div>
        </div>
    );
}


export default VistaProfes;