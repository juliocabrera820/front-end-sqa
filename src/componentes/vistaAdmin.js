import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "./header";
import axios from "axios";
import ItemHorario from "./itemHorario";
import ItemMateria from "./itemMateria";

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
              <div className="col-12 center">
                <div class="form-group">
                  <label for="sel1">Selecciona un grupo:</label>
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
                </div>
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
            <div className="col-8 row">
              <div className="col-4 col-xl-4 row">
                Nombre del Grupo: {selectGrupo}
              </div>
              <div className="col-4 col-xl-4 row">
                Materia: {selectMateria}
              </div>

              <div class="form-group">
                  <label for="sel1">Selecciona un grupo:</label>
                  <select className="form-control" onChange={e=>console.log(e.currentTarget.value)}>
                    <option>Selecciona un profesor</option>
                    {
                      maestros.map(m=>{
                        return(
                        <option key ={m.Maestro} value ={m.Maestro}>{`${m.Nombres} ${m.ApellidoM} ${m.ApellidoP}`}</option>
                        )
                      })
                    }
                  </select>
                </div>  
            </div>
        </div>
      </div>
    </div>
  );
};


export default withRouter(VistaAdmin);
