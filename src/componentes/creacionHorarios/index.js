import React, { useEffect, useState } from "react";
import moment from "moment";
import aulasService from "../../services/aulasService";
import horariosService from "../../services/horariosService";
import ItemMateria from "../itemMateria";
import ItemHora from "../itemHora";
import { Div, Item, Input, Button, Select, Text, Titulo } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getGroups, setCurrentGroup } from "../../redux/actions/groupAction";
import { setCurrentSubject } from "../../redux/actions/subjectsAction";
import notificacion from "../../componentes/notificacion";

const CreacionHorarios = () => {
  const { groups, currentGroup } = useSelector((state) => state.group);
  const { subjects, currentSubject } = useSelector((state) => state.subject);
  const [maestros, setMaestros] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [selectMaestro, setSelectMaestro] = useState("");
  const [checkbox, setCheckbox] = useState({
    lunes: true,
    martes: true,
    miercoles: true,
    jueves: true,
    viernes: true,
  });

  const dispatch = useDispatch();
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
    notificacion(
      `El horario del ${dia} ha sido cargado exitosamente`,
      "success",
      1
    );

  const horarioError = (dia, mensaje) => notificacion(mensaje, "error", 1);

  useEffect(() => {
    dispatch(getGroups());
    aulasService()
      .getAll()
      .then((response) => {
        setAulas(response.data.data);
      })
      .catch((error) => console.log("no se pudo conectar con el servidor"));
  }, []);

  const getMaterias = (e) => {
    const select = e.currentTarget.value;
    dispatch(setCurrentGroup(select));
  };

  const Materia = (materia) => {
    dispatch(setCurrentSubject(materia));
  };

  const SelecionarMaestro = (clvMaestro) => {
    setSelectMaestro(clvMaestro);
  };

  const enviarHorario = (dia) => {
    const horarioSeleccionado = {
      maestro: `${selectMaestro}`,
      grupo: `${currentGroup}`,
      materia: `${currentSubject}`,
      aula: `${horario[dia].aula}`,
      hInicio: `${horario[dia].horaInicio.hora}:${horario[dia].horaInicio.minutos}:00`,
      hFinal: `${horario[dia].horaFinal.hora}:${horario[dia].horaFinal.minutos}:00`,
      dia: `${dia}`,
    };

    horariosService()
      .create(horarioSeleccionado)
      .then((response) => {
        console.log(response.data.data);

        if (response.data.data === "Horario Creado.") {
          horarioExitoso(dia);
        } else {
          let mensaje = `No se puede guardar el horario del ${dia}. `;
          response.data.data.aula
            ? (mensaje += "Aula ocupada. ")
            : (mensaje += " ");
          response.data.data.grupo
            ? (mensaje += "El grupo ya tienen una materia en esa hora. ")
            : (mensaje += " ");
          response.data.data.maestro
            ? (mensaje +=
                "El  Maestro ya tienen una materia asignada a esa hora.")
            : (mensaje += "");
          horarioError(dia, mensaje);
        }
      })
      .catch((error) => console.log("no se puede enviar horario"));
  };

  const validarHoras = (dia) => {
    const inicio = moment(
      [
        parseInt(horario[dia].horaInicio.hora),
        parseInt(horario[dia].horaInicio.minutos),
      ],
      "HH:mm"
    );
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
    if (!currentGroup) {
      notificacion("Seleccione un Grup", "warning", 1);
    }

    if (!currentSubject) {
      notificacion("Seleccione una Materia", "warning", 2);
    }

    if (selectMaestro === "") {
      notificacion("Seleccione un Maestro", "warning", 3);
    }
    const encabezado = currentGroup || currentSubject || selectMaestro === "";

    if (!encabezado && !checkbox.lunes) {
      if (
        validarHoras("Lunes") &&
        horario.Lunes.aula !== "" &&
        horario.Lunes.aula !== "Selecciona un salón"
      ) {
        enviarHorario("Lunes");
      } else {
        horarioError(
          "Lunes",
          "Revise que los datos del horario Lunes esten correctos"
        );
      }
    }

    if (
      !encabezado &&
      !checkbox.martes &&
      horario.Martes.aula !== "" &&
      horario.Martes.aula !== "Selecciona un salón"
    ) {
      if (validarHoras("Martes")) {
        enviarHorario("Martes");
      } else {
        horarioError(
          "Martes",
          "Revise que los datos del horario Martes esten correctos"
        );
      }
    }

    if (
      !encabezado &&
      !checkbox.miercoles &&
      horario.Miercoles.aula !== "" &&
      horario.Miercoles.aula !== "Selecciona un salón"
    ) {
      if (validarHoras("Miercoles")) {
        enviarHorario("Miercoles");
      } else {
        horarioError(
          "Miercoles",
          "Revise que los datos del horario Miercoles esten correctos"
        );
      }
    }

    if (
      !encabezado &&
      !checkbox.jueves &&
      horario.Jueves.aula !== "" &&
      horario.Jueves.aula !== "Selecciona un salón"
    ) {
      if (validarHoras("Jueves")) {
        enviarHorario("Jueves");
      } else {
        horarioError(
          "Jueves",
          "Revise que los datos del horario Jueves esten correctos"
        );
      }
    }

    if (
      !encabezado &&
      !checkbox.viernes &&
      horario.Viernes.aula !== "" &&
      horario.Viernes.aula !== "Selecciona un salón"
    ) {
      if (validarHoras("Viernes")) {
        enviarHorario("Viernes");
      } else {
        horarioError(
          "Viernes",
          "Revise que los datos del horario Viernes esten correctos"
        );
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
                  {groups?.map((grupo) => {
                    return (
                      <option key={grupo.Clv_Grupo} value={grupo.Clv_Grupo}>
                        {grupo.Clv_Grupo}
                      </option>
                    );
                  })}
                </select>
              </Select>
            </div>
            {subjects?.map((materia) => {
              return (
                <div
                  key={materia.clv_materia}
                  className="col-12 col-md-6 col-xl-12"
                  onClick={(e) => Materia(materia)}
                >
                  <ItemMateria
                    materia={materia.Materia}
                    className="align-items-center"
                  />
                </div>
              );
            })}
          </div>
          <div className="col-12 col-xl-9 row">
            <Div className="col-6 col-xl-4">
              <Text>Nombre del Grupo: {currentGroup}</Text>
            </Div>
            <Div className="col-6 col-xl-4">
              <Text>Materia: {currentSubject?.Materia}</Text>
            </Div>

            <Select className="col-12 col-xl-4">
              <label>Selecciona un profesor:</label>
              <select
                className="form-control"
                onChange={(e) => SelecionarMaestro(e.currentTarget.value)}
              >
                <option>Selecciona un profesor</option>
                {maestros.map((maestro) => {
                  return (
                    <option key={maestro.Maestro} value={maestro.Maestro}>
                      {`${maestro.Nombres} ${maestro.ApellidoM} ${maestro.ApellidoP}`}
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

export default CreacionHorarios;
