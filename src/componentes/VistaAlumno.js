import React, { useState,useEffect } from 'react';
import ItemHorario from './itemHorario';
import Header from './header'
import axios from 'axios'
import styled from 'styled-components'

function VistaAlumno (){

    const {horario, setHorario} = useState();
    const horarios=[
        {
            "Clv_Horario":1,
            "Nombres":"Carlos Benito",
            "ApellidoM":"Mojica",
            "ApellidoP":"Ruiz",
            "Materia":"Aseguramiento de la calidad",
            "Clv_Materia":"QA",
            "aula":"D1",
            "HInicio":"07:30:00",
            "HFinal":"08:30:00",
            "Dia":"Lunes"
        },
        {
            "Clv_Horario":2,
            "Nombres":"Carlos Benito",
            "ApellidoM":"Mojica",
            "ApellidoP":"Ruiz",
            "Materia":"Aseguramiento de la calidad",
            "Clv_Materia":"QA",
            "aula":"D1",
            "HInicio":"07:30:00",
            "HFinal":"08:30:00",
            "Dia":"Jueves"
        },
        {
            "Clv_Horario":3,
            "Nombres":"Carlos Benito",
            "ApellidoM":"Mojica",
            "ApellidoP":"Ruiz",
            "Materia":"Aseguramiento de la calidad",
            "Clv_Materia":"QA",
            "aula":"D1",
            "HInicio":"07:30:00",
            "HFinal":"08:30:00",
            "Dia":"Viernes"
        },
        {
            "Clv_Horario":4,
            "Nombres":"Victor Hugo",
            "ApellidoM":"Menendez",
            "ApellidoP":"Dominguez",
            "Materia":"Interaccion humano computadora",
            "Clv_Materia":"IHC",
            "aula":"D2",
            "HInicio":"08:30:00",
            "HFinal":"10:00:00",
            "Dia":"Lunes"
        },
        {
            "Clv_Horario":5,
            "Nombres":"Victor Hugo",
            "ApellidoM":"Menendez",
            "ApellidoP":"Dominguez",
            "Materia":"Interaccion humano computadora",
            "Clv_Materia":"IHC",
            "aula":"D2",
            "HInicio":"08:30:00",
            "HFinal":"10:00:00",
            "Dia":"Miercoles"
        },
        {
            "Clv_Horario":6,
            "Nombres":"Victor Hugo",
            "ApellidoM":"Menendez",
            "ApellidoP":"Dominguez",
            "Materia":"Interaccion humano computadora",
            "Clv_Materia":"IHC",
            "aula":"D2",
            "HInicio":"08:30:00",
            "HFinal":"10:00:00",
            "Dia":"Viernes"
        },
        {
            "Clv_Horario":7,
            "Nombres":"Victor Hugo",
            "ApellidoM":"Menendez",
            "ApellidoP":"Dominguez",
            "Materia":"Interaccion humano computadora",
            "Clv_Materia":"CS",
            "aula":"D2",
            "HInicio":"08:30:00",
            "HFinal":"10:00:00",
            "Dia":"Viernes"
        },
        {
            "Clv_Horario":8,
            "Nombres":"Victor Hugo",
            "ApellidoM":"Menendez",
            "ApellidoP":"Dominguez",
            "Materia":"Interaccion humano computadora",
            "Clv_Materia":"CS",
            "aula":"D2",
            "HInicio":"08:30:00",
            "HFinal":"10:00:00",
            "Dia":"Viernes"
        },
        {
            "Clv_Horario":9,
            "Nombres":"Victor Hugo",
            "ApellidoM":"Menendez",
            "ApellidoP":"Dominguez",
            "Materia":"Interaccion humano computadora",
            "Clv_Materia":"CS",
            "aula":"D2",
            "HInicio":"08:30:00",
            "HFinal":"10:00:00",
            "Dia":"Viernes"
        }
 
    ];

    const asg = [...( new Set(horarios.map(x=>x.Clv_Materia)))];
    

    useEffect(() => {
        /*axios.get("http://localhost/SGH-BackEnd/api/").then(response=>{
                setHorario(response.data.data);
        }).catch(error=>console.log("no se pudo conectar con el servidor"));*/

    });


    const Titulo = styled.th`
        font-family: 'Yanone Kaffeesatz', sans-serif;
        font-size: 20px;
        opacity: .8;
        border : black 1px solid;
        text-align:center;
        padding: 0px;
    `;

 

    const Cuerpo = styled.div`
        font-family: 'Yanone Kaffeesatz', sans-serif;
        font-size: 30px;
        opacity: .8;
        margin-bottom:10px;
    `;

    const creartabla=()=>{
        let aux = new Array();
        for(let i =0; i<asg.length; i++){
            let hora = horarios.filter(x=>x.Clv_Materia===asg[i]);
            aux[i] = {
                Nombre: hora[i].Nombres,
                ApellidoM: hora[i].ApellidoM,
                ApellidoP: hora[i].ApellidoP,
                Clv_Materia: hora[i].Clv_Materia,
                Materia: hora[i].Materia,
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
        
            
            for(let j = 0; j<hora.length; j++){
                aux[i][hora[j].Dia]["Aula"]=hora[j].aula;
                aux[i][hora[j].Dia]["HoraI"]=hora[j].HInicio;
                aux[i][hora[j].Dia]["HoraF"]=hora[j].HFinal;
            }
        }

        return aux;
    }

    const formatoH = (hora)=>{
        return hora.slice(0,-3);
    }

    const materias = creartabla();
    return (
        <div>
            <Header />
            <div className="container table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <Titulo scope="col">Asignatura</Titulo>
                            <Titulo scope="col">Profesor</Titulo>
                            <Titulo scope="col">Grupo</Titulo>
                            <Titulo scope="col">Lunes</Titulo>
                            <Titulo scope="col">Martes</Titulo>
                            <Titulo scope="col">Miercoles</Titulo>
                            <Titulo scope="col">Jueves</Titulo>
                            <Titulo scope="col">Viernes</Titulo>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {/*prueba*/}
                        <tr>
                            <th scope="row">Ciencias de la computacion</th>
                            <td>Carlos Mojica Ruiz</td>
                            <td>GrupoA</td>
                            <td><ItemHorario hora="08:30-10:00" aula="CC1" profesor="Carlos Mojica Ruiz"/></td>
                            <td><ItemHorario hora="08:30-10:00" aula="CC1" profesor="Carlos Mojica Ruiz"/></td>
                            <td><ItemHorario hora="08:30-10:00" aula="CC1" profesor="Carlos Mojica Ruiz"/></td>
                            <td><ItemHorario hora="08:30-10:00" aula="CC1" profesor="Carlos Mojica Ruiz"/></td>
                            <td><ItemHorario hora="08:30-10:00" aula="CC1" profesor="Carlos Mojica Ruiz"/></td>
                        </tr>

                
                        {
                            materias.map((mat)=>{
                                return  <tr>
                                            <th scope="row">{mat.Materia}</th>
                                            <td>{mat.Nombre+" "+mat.ApellidoM+" "+mat.ApellidoP}</td>
                                            <td>{mat.Grupo}</td>
                                            <td><ItemHorario 
                                                    hora={formatoH(mat.Lunes.HoraI)+"-"+formatoH(mat.Lunes.HoraF)} 
                                                    aula={mat.Lunes.Aula} 
                                                    profesor={mat.Nombre+" "+mat.ApellidoM+" "+mat.ApellidoP}/>
                                            </td>
                                            <td><ItemHorario 
                                                    hora={formatoH(mat.Martes.HoraI)+"-"+formatoH(mat.Martes.HoraF)} 
                                                    aula={mat.Martes.Aula} 
                                                    profesor={mat.Nombre+" "+mat.ApellidoM+" "+mat.ApellidoP}/>
                                            </td>
                                            <td><ItemHorario 
                                                    hora={formatoH(mat.Miercoles.HoraI)+"-"+formatoH(mat.Miercoles.HoraF)} 
                                                    aula={mat.Miercoles.Aula} 
                                                    profesor={mat.Nombre+" "+mat.ApellidoM+" "+mat.ApellidoP}/>
                                            </td>
                                            <td><ItemHorario 
                                                    hora={formatoH(mat.Jueves.HoraI)+"-"+formatoH(mat.Jueves.HoraF)} 
                                                    aula={mat.Jueves.Aula} 
                                                    profesor={mat.Nombre+" "+mat.ApellidoM+" "+mat.ApellidoP}/>
                                            </td>
                                            <td><ItemHorario 
                                                    hora={formatoH(mat.Viernes.HoraI)+"-"+formatoH(mat.Viernes.HoraF)} 
                                                    aula={mat.Viernes.Aula} 
                                                    profesor={mat.Nombre+" "+mat.ApellidoM+" "+mat.ApellidoP}/>
                                            </td>
                                        </tr>
                            })
                        }
                
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default VistaAlumno;