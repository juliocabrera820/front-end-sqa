import React, {useState}from 'react';
import styled from 'styled-components';
import {Horas,Minutos} from "./horarios";

const itemHora = (props) => {

    return (
        <Item className="" >
            <Titulo>Lunes</Titulo>
            <div className="col-12 form-inline">
                <select className="form-control-sm">
                    {Horas.map(h=>{
                    return(
                    <option>{h.hora}</option>
                    );
                    })}
                </select>
                <select className="form-control-sm">
                {Minutos.map(h=>{
                    return(
                    <option>{h.minutos}</option>
                    );
                    })}
                </select>
            </div>
        
            <div className="col-12 form-inline">
                <select className="form-control-sm">
                    {Horas.map(h=>{
                    return(
                    <option>{h.hora}</option>
                    );
                    })}
                </select>
                <select className="form-control-sm">
                {Minutos.map(h=>{
                    return(
                    <option>{h.minutos}</option>
                    );
                    })}
                </select>
            </div>
      </Item>
    );
    
}

export default itemHora;

const Item = styled.div`
    text-align: center; 
    vertical-align: middle;
`;

const Input = styled.input`
    transform: scale(1.5);
`;

const Titulo = styled.div`
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 20px;  
`;