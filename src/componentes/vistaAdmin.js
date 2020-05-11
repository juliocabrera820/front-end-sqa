import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "./header";
import axios from "axios";
import ItemHorario from "./itemHorario";
import ItemMateria from "./itemMateria";
import ItemHora from "./itemHora"
import styled from "styled-components";


const VistaAdmin = (props) => {
  const { history } = props;
  const estado = useSelector((state) => state);
  const [grupos, setGrupos] = useState([])
  const [materias, SetMaterias]=useState([]);
  const [maestros, setMaestros] = useState([]);
  const [selectGrupo, setSelectGrupo] = useState("");
  const [selectMateria,setSelectMateria] = useState("");


  useEffect(() => {
    if (estado.Usuario === "No hay usuario") {
      history.push("/");
    }

    axios
    .get("http://localhost/SGH-BackEnd/api/grupos")
    .then(response => {
      setGrupos(response.data.data);
    })
    .catch(error=>console.log("no se pudo conectar con el servidor"));
  }, [estado,history]);

  const getMaterias = (e)=>{
    const select = e.currentTarget.value;
    setSelectGrupo(select);
    setSelectMateria("");
    setMaestros([]);
    axios
    .get(`http://localhost/SGH-BackEnd/api/grupos/${select}`)
    .then(response=>{
      response.data.data.mensaje!=="No se encontraron coincidencias" ? SetMaterias(response.data.data):SetMaterias([]);
      
    })
    .catch(error=>console.log("no se pudo conectar con el servidor"));
  }

  const Materia = (Clv_Materia,materia)=>{
    setSelectMateria(materia);
    axios
    .get(`http://localhost/SGH-BackEnd/api/maestros/materias/${Clv_Materia}`)
    .then(response=>{
      setMaestros(response.data.data);
    })
    .catch(error=>console.log("no se pudo conectar con el servidor"));
  }

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row "> 
            <div className="col-12 col-md-12 col-xl-3 row">
              <div className="col-12">
                <Select className="form-group">
                  <label >Selecciona un grupo:</label>
                  <select className="form-control" onChange={e=>getMaterias(e)}>
                    <option>Selecciona un grupo</option>
                    {
                      grupos.map(g=>{
                        return(
                        <option key ={g.Clv_Grupo} value ={g.Clv_Grupo}>{g.Clv_Grupo}</option>
                        )
                      })
                    }
                  </select>
                </Select>
                </div>
                  {
                    materias.map(m=>{
                      return (
                        <div key={m.clv_materia} className="col-12 col-md-6 col-xl-12" onClick={e=>Materia(m.clv_materia,m.Materia)}>
                        
                        <ItemMateria materia={m.Materia} className="align-items-center"/>
                        
                        </div>
                      )
                    })
                  }
            </div>
            <div className="col-12 col-xl-9 row">
              <Div className="col-6 col-xl-4">
                <Text>Nombre del Grupo: {selectGrupo}</Text>
              </Div>
              <Div className="col-6 col-xl-4">
                <Text>Materia: {selectMateria}</Text>
              </Div>

              <Select className="col-12 col-xl-4">
                  <label >Selecciona un profesor:</label>
                  <select className="form-control" onChange={e=>console.log(e.currentTarget.value)} >
                    <option>Selecciona un profesor</option>
                    {
                      maestros.map(m=>{
                        return(
                        <option key ={m.Maestro} value ={m.Maestro}>{`${m.Nombres} ${m.ApellidoM} ${m.ApellidoP}`}</option>
                        )
                      })
                    }
                  </select>
                </Select> 

                  <div className=" col-xl-1">
                    <Titulo>Hora/Día</Titulo>
                    <div>Inicio</div>
                    <div>Final</div>
                  </div>
                  <div className=" col-xl-2">
                    <ItemHora/>
                    <div className="form-check form-check-inline">
                      <Input type="checkbox" className="form-check-input"></Input>
                    </div>
                  </div>
                  <div className=" col-xl-2">
                    <ItemHora/>
                    <div className="form-check form-check-inline">
                      <Input type="checkbox" className="form-check-input"></Input>
                    </div>
                  </div>
                  <div className=" col-xl-2">
                   <ItemHora/>
                   <div className="form-check form-check-inline">
                      <Input type="checkbox" className="form-check-input"></Input>
                    </div>
                  </div>
                  <div className=" col-xl-2">
                    <ItemHora/>
                    <div className="form-check form-check-inline">
                      <Input type="checkbox" className="form-check-input"></Input>
                    </div>
                  </div>
                  <div className=" col-xl-2">
                   <ItemHora/>
                   <div className="form-check form-check-inline">
                      <Input type="checkbox" className="form-check-input"></Input>
                    </div>
                  </div>
                  <div className=" col-xl-1">
                        <Titulo>Opciones</Titulo>
                        <button>Aceptar</button>
                        <button>Cancelar</button>
                  </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const Div = styled.div`
  height: 100px;
  margin-botton:  0px
`;

const Select = styled.div`
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-size: 1.7em;
`;


const Text = styled.div`
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-size: 1.7em;
`;

const Titulo = styled.div`
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 20px;  
`;
const Input = styled.input`
    transform: scale(1.5);
`;

export default withRouter(VistaAdmin);
