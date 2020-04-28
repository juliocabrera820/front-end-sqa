import React from 'react';
import styled from 'styled-components'


const itemHorario = (props) => {

    const generarColor= ()=> {
        return '#' +  Math.random().toString(16).substr(-6);
    };

    const Item = styled.div`
        background-color:${generarColor()};
        border-radius: 5px;
        margin:0px;    
    `;

    const Div = styled.div`
        background-color: white;
        margin-left: 5px;
    `;

    const Hora = styled.div`
      font-size: 20px;  
    `;

    const Aula = styled.div`
        font-size: 20px;
    `;

    const Maestro = styled.div`
        font-size: 18px;
    `;

    if(props.hora ==="" || props.aula===""){
        return(
            <div>

            </div>
        );
    }else{
        return (
            <Item>
                <Div>
                    <Hora>{props.hora}</Hora>
                    <Aula>Aula: {props.aula}</Aula>
                    <Maestro>Maestro: {props.profesor}</Maestro>
                </Div>
            </Item>
            );
    }
    
}

export default itemHorario;