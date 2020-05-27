import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ItemMateria from "./itemMateria";
import ItemHora from "./itemHora";
import styled from "styled-components";
import { toast } from "react-toastify";
import moment from 'moment';

toast.configure({
  autoClose: 4000,
  draggable: false,
  position: toast.POSITION.BOTTOM_RIGHT,
});

const CreacionHorarios = (props) => {
  const { history } = props;
  const estado = useSelector((state) => state);
  const [grupos, setGrupos] = useState([]);
  const [materias, SetMaterias] = useState([]);
  const [maestros, setMaestros] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [materia, setMateria] = useState("");
  const [selectGrupo, setSelectGrupo] = useState("");
  const [selectMateria, setSelectMateria] = useState("");
  const [selectMaestro, setSelectMaestro] = useState("");
  const [checkbox, setCheckbox] = useState({
    lunes: true,
    martes: true,
    miercoles: true,
    jueves: true,
    viernes: true,
  });

  const [horario, setHorario] = useState({
    Lunes: {
      aula: "",
      dia: "Lunes",
      horaInicio: {
        hora: "",
        minutos: "",
      },
      horaFinal: {
        hora: "",
        minutos: "",
      },
      status: false,
      cargado: false,
    },
    Martes: {
      aula: "",
      dia: "Martes",
      horaInicio: {
        hora: "",
        minutos: "",
      },
      horaFinal: {
        hora: "",
        minutos: "",
      },
      status: false,
      cargado: false,
    },
    Miercoles: {
      aula: "",
      dia: "Miercoles",
      horaInicio: {
        hora: "",
        minutos: "",
      },
      horaFinal: {
        hora: "",
        minutos: "",
      },
      status: false,
      cargado: false,
    },
    Jueves: {
      aula: "",
      dia: "Jueves",
      horaInicio: {
        hora: "",
        minutos: "",
      },
      horaFinal: {
        hora: "",
        minutos: "",
      },
      status: false,
      cargado: false,
    },
    Viernes: {
      aula: "",
      dia: "Viernes",
      horaInicio: {
        hora: "",
        minutos: "",
      },
      horaFinal: {
        hora: "",
        minutos: "",
      },
      status: false,
      cargado: false,
    },
  });

  const horarioExitoso = (dia) =>
    toast(`El horario del ${dia} ha sido cargado exitosamente`, {
      type: toast.TYPE.SUCCESS,
      toastId: dia,
    });

  const horarioError = (dia) =>
    toast(
      `El horario del dia ${dia} tuvo un error revise los campos correctamente`,
      {
        type: toast.TYPE.ERROR,
        toastId: dia,
      }
    );

  const camposVacios = (mensaje, id) =>
    toast(mensaje, {
      type: toast.TYPE.WARNING,
      toastId: id,
    });

  useEffect(() => {
    if (estado.Usuario === "No hay usuario") {
      history.push("/");
    }

    axios
      .get("http://localhost/SGH-BackEnd/api/grupos")
      .then((response) => {
        setGrupos(response.data.data);
      })
      .catch((error) => console.log("no se pudo conectar con el servidor"));

    axios
      .get("http://localhost/SGH-BackEnd/api/aulas")
      .then((response) => {
        setAulas(response.data.data);
      })
      .catch((error) => console.log("no se pudo conectar con el servidor"));
  }, [estado, history]);

  const getMaterias = (e) => {
    const select = e.currentTarget.value;
    setSelectGrupo(select);
    setSelectMateria("");
    setMateria("");
    setMaestros([]);
    axios
      .get(`http://localhost/SGH-BackEnd/api/grupos/${select}`)
      .then((response) => {
        response.data.data.mensaje !== "No se encontraron coincidencias"
          ? SetMaterias(response.data.data)
          : SetMaterias([]);
      })
      .catch((error) => console.log("no se pudo conectar con el servidor"));
  };

  const Materia = (Clv_Materia, materia) => {
    setSelectMateria(Clv_Materia);
    setMateria(materia);
    axios
      .get(`http://localhost/SGH-BackEnd/api/maestros/materias/${Clv_Materia}`)
      .then((response) => {
        setMaestros(response.data.data);
      })
      .catch((error) => console.log("no se pudo conectar con el servidor"));
  };

  const SelecionarMaestro = (Clv_Maestro) => {
    setSelectMaestro(Clv_Maestro);
  };

  const enviarHorario = (dia) => {
    const post = {
      maestro: `${selectMaestro}`,
      grupo: `${selectGrupo}`,
      materia: `${selectMateria}`,
      aula: `${horario[dia].aula}`,
      hInicio: `${horario[dia].horaInicio.hora}:${horario[dia].horaInicio.minutos}:00`,
      hFinal: `${horario[dia].horaFinal.hora}:${horario[dia].horaFinal.minutos}:00`,
      dia: `${dia}`,
    };
    console.log(post);

    /*
      Valida que los datos de "post"
        *El maestro no tenga clases a ese horario,
        *La aula no este ocupada
        *El grupo no tenga clases en ese horario


        1.- Una manera seria que se haga un condicion en la sentencia SQL, que cumple con todo lo de arriba, se ingrese a la BD
        2.- Otra seria que verifiques lo horario del maestro, la del grupo, para veer si esta ocupados.
        3.- Si tienen otra idea 
      */

    axios
      .post("http://localhost/SGH-BackEnd/api/horarios", post)
      .then((response) => console.log(response.data))
      .catch((error) => console.log("no se puede enviar horario"));
  };

  const validarHoras = (dia) => {
    /*Valida que las hora de inicio sea menor que la hora final, si es posible filtra los valores
    ejemplo selecciona 8:30, entonces el combobox de hora final comienza desde 9:00.
    */
   const inicio = moment([
     parseInt(horario[dia].horaInicio.hora),
     parseInt(horario[dia].horaInicio.minutos)
   ],"HH:mm");
   const final = moment(
     [
       parseInt(horario[dia].horaFinal.hora),
       parseInt(horario[dia].horaFinal.minutos),
     ],
     "HH:mm"
   );
   return inicio.isBefore(final);
  };

  const crearHorario = () => {
    if (selectGrupo === "") {
      camposVacios("Seleccione un Grupo", 1);
    }

    if (selectMateria === "") {
      camposVacios("Seleccione una Materia", 2);
    }

    if (selectMaestro === "") {
      camposVacios("Seleccione un Maestro", 3);
    }
    const encabezado =
      selectGrupo === "" || selectMateria === "" || selectMaestro === "";
    if (!encabezado && !checkbox.lunes) {
      if (validarHoras("Lunes")) {
        enviarHorario("Lunes");
      } else {
        horarioError("Lunes");
      }
    }

    if (!encabezado && !checkbox.martes) {
      if (validarHoras("Martes")) {
        enviarHorario("Martes");
      } else {
        horarioError("Martes");
      }
    }

    if (!encabezado && !checkbox.miercoles) {
      if (validarHoras("Miercoles")) {
        enviarHorario("Miercoles");
      } else {
        horarioError("Miercoles");
      }
    }

    if (!encabezado && !checkbox.jueves) {
      if (validarHoras("Jueves")) {
        enviarHorario("Jueves");
      } else {
        horarioError("Jueves");
      }
    }

    if (!encabezado && !checkbox.viernes) {
      if (validarHoras("Viernes")) {
        enviarHorario("Viernes");
      } else {
        horarioError("Viernes");
      }
    }
  };

  const seleccionarDia = (dia, aula) => {
    horario[dia].aula = aula;
  };

  const seleccionarHoraI = (dia, ih) => {
    horario[dia].horaInicio.hora = ih;
  };
  const seleccionarMinutosI = (dia, im) => {
    horario[dia].horaInicio.minutos = im;
  };

  const seleccionarHoraF = (dia, fh) => {
    horario[dia].horaFinal.hora = fh;
  };
  const seleccionarMinutosF = (dia, fm) => {
    horario[dia].horaFinal.minutos = fm;
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-12 col-md-12 col-xl-3 row">
            <div className="col-12">
              <Select className="form-group">
                <label>Selecciona un grupo:</label>
                <select
                  className="form-control"
                  onChange={(e) => getMaterias(e)}
                >
                  <option>Selecciona un grupo</option>
                  {grupos.map((g) => {
                    return (
                      <option key={g.Clv_Grupo} value={g.Clv_Grupo}>
                        {g.Clv_Grupo}
                      </option>
                    );
                  })}
                </select>
              </Select>
            </div>
            {materias.map((m) => {
              return (
                <div
                  key={m.clv_materia}
                  className="col-12 col-md-6 col-xl-12"
                  onClick={(e) => Materia(m.clv_materia, m.Materia)}
                >
                  <ItemMateria
                    materia={m.Materia}
                    className="align-items-center"
                  />
                </div>
              );
            })}
          </div>
          <div className="col-12 col-xl-9 row">
            <Div className="col-6 col-xl-4">
              <Text>Nombre del Grupo: {selectGrupo}</Text>
            </Div>
            <Div className="col-6 col-xl-4">
              <Text>Materia: {materia}</Text>
            </Div>

            <Select className="col-12 col-xl-4">
              <label>Selecciona un profesor:</label>
              <select
                className="form-control"
                onChange={(e) => SelecionarMaestro(e.currentTarget.value)}
              >
                <option>Selecciona un profesor</option>
                {maestros.map((m) => {
                  return (
                    <option key={m.Maestro} value={m.Maestro}>
                      {`${m.Nombres} ${m.ApellidoM} ${m.ApellidoP}`}
                    </option>
                  );
                })}
              </select>
            </Select>

            <Item className=" col-xl-2">
              <ItemHora
                dia="Lunes"
                status={checkbox.lunes}
                aulas={aulas}
                Dia={seleccionarDia}
                hi={seleccionarHoraI}
                mi={seleccionarMinutosI}
                hf={seleccionarHoraF}
                mf={seleccionarMinutosF}
              />
              <div className="form-check form-check-inline">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  onChange={(e) =>
                    setCheckbox({ ...checkbox, lunes: !checkbox.lunes })
                  }
                ></Input>
                <label className="form-check-label">
                  {!checkbox.lunes ? "habilitado" : "Deshabilitado"}
                </label>
              </div>
            </Item>
            <Item className=" col-xl-2">
              <ItemHora
                dia="Martes"
                status={checkbox.martes}
                aulas={aulas}
                Dia={seleccionarDia}
                hi={seleccionarHoraI}
                mi={seleccionarMinutosI}
                hf={seleccionarHoraF}
                mf={seleccionarMinutosF}
              />
              <div className="form-check form-check-inline">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  onChange={(e) =>
                    setCheckbox({ ...checkbox, martes: !checkbox.martes })
                  }
                ></Input>
                <label className="form-check-label">
                  {!checkbox.martes ? "habilitado" : "Deshabilitado"}
                </label>
              </div>
            </Item>
            <Item className=" col-xl-2">
              <ItemHora
                dia="Miercoles"
                status={checkbox.miercoles}
                aulas={aulas}
                Dia={seleccionarDia}
                hi={seleccionarHoraI}
                mi={seleccionarMinutosI}
                hf={seleccionarHoraF}
                mf={seleccionarMinutosF}
              />
              <div className="form-check form-check-inline">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  onChange={(e) =>
                    setCheckbox({ ...checkbox, miercoles: !checkbox.miercoles })
                  }
                ></Input>
                <label className="form-check-label">
                  {checkbox.miercoles ? "habilitado" : "Deshabilitado"}
                </label>
              </div>
            </Item>
            <Item className=" col-xl-2">
              <ItemHora
                dia="Jueves"
                status={checkbox.jueves}
                aulas={aulas}
                Dia={seleccionarDia}
                hi={seleccionarHoraI}
                mi={seleccionarMinutosI}
                hf={seleccionarHoraF}
                mf={seleccionarMinutosF}
              />
              <div className="form-check form-check-inline">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  onChange={(e) =>
                    setCheckbox({ ...checkbox, jueves: !checkbox.jueves })
                  }
                ></Input>
                <label className="form-check-label">
                  {!checkbox.jueves ? "habilitado" : "Deshabilitado"}
                </label>
              </div>
            </Item>
            <Item className=" col-xl-2">
              <ItemHora
                dia="Viernes"
                status={checkbox.viernes}
                aulas={aulas}
                Dia={seleccionarDia}
                hi={seleccionarHoraI}
                mi={seleccionarMinutosI}
                hf={seleccionarHoraF}
                mf={seleccionarMinutosF}
              />
              <div className="form-check form-check-inline">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  onChange={(e) =>
                    setCheckbox({ ...checkbox, viernes: !checkbox.viernes })
                  }
                ></Input>
                <label className="form-check-label">
                  {!checkbox.viernes ? "habilitado" : "Deshabilitado"}
                </label>
              </div>
            </Item>
            <div className=" col-xl-2 row">
              <Titulo className="col-12 align-self-start">Opciones</Titulo>
              <div className="col-12 align-self-center">
                <Button
                  className="btn btn-success"
                  onClick={(e) => crearHorario()}
                >
                  Aceptar
                </Button>
              </div>
              <div className="col-12 align-self-center">
                <Button className="btn btn-danger">Cancelar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Div = styled.div`
  height: 100px;
  margin-botton: 0px;
`;

const Item = styled.div`
  text-align: center;
`;

const Button = styled.button``;

const Select = styled.div`
  font-family: "Yanone Kaffeesatz", sans-serif;
  font-size: 1.7em;
`;

const Text = styled.div`
  font-family: "Yanone Kaffeesatz", sans-serif;
  font-size: 1.7em;
`;

const Titulo = styled.div`
  font-family: "Yanone Kaffeesatz", sans-serif;
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 20px;
`;
const Input = styled.input`
  transform: scale(1.5);
`;

export default CreacionHorarios;