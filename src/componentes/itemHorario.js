import React from 'react';

const itemHorario = (props) => {


    if(props.hora ==="" || props.aula===""){
        return(
            <div>

            </div>
        );
    }else{
        return (
            <div>
                <div>{props.hora}</div>
                <div>Aula: {props.aula}</div>
                <div>Maestro: {props.profesor}</div>
            </div>
            );
    }
    
}

export default itemHorario;