import React, { useEffect, useState } from "react";
import moment from "moment";
import ItemMateria from "../itemMateria";
import ItemHora from "../itemHora";
import { Div, Item, Input, Button, Select, Text, Titulo } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getGroups, setCurrentGroup } from "../../redux/actions/groupAction";
import { getClassrooms } from "../../redux/actions/classroomAction";
import { setCurrentSubject } from "../../redux/actions/subjectsAction";
import { setCurrentTeacher } from "../../redux/actions/teacherAction";
import { saveSchedule } from "../../redux/actions/AdminAction";
import { cleanSchedule } from "../../redux/actions/scheduleAction";
import { useUser } from "../../shared/hooks/useUser";
import notificacion from "../../componentes/notificacion";

const CreacionHorarios = () => {
  const { token } = useUser();
  const { groups, currentGroup } = useSelector((state) => state.group);
  const { subjects, currentSubject } = useSelector((state) => state.subject);
  const { teachers, currentTeacher } = useSelector((state) => state.teacher);
  const { newSchedule } = useSelector((state) => state.schedule);
  const [checkbox, setCheckbox] = useState({
    lunes: true,
    martes: true,
    miercoles: true,
    jueves: true,
    viernes: true,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroups(token));
    dispatch(getClassrooms(token));
    return () => dispatch(cleanSchedule());
  }, []);

  const getMaterias = (e) => {
    const select = e.currentTarget.value;
    dispatch(setCurrentGroup(select, token));
  };

  const Materia = (materia) => {
    dispatch(setCurrentSubject(materia));
  };

  const SelecionarMaestro = (clvMaestro) => {
    dispatch(setCurrentTeacher(clvMaestro));
  };

  const enviarHorario = (dia) => {
    const horarioSeleccionado = {
      maestro: `${currentTeacher}`,
      grupo: `${currentGroup}`,
      materia: `${currentSubject.clv_materia}`,
      aula: `${newSchedule[dia].classroom}`,
      hInicio: `${newSchedule[dia].startH}:${newSchedule[dia].startM}:00`,
      hFinal: `${newSchedule[dia].finishH}:${newSchedule[dia].finishM}:00`,
      dia: `${dia}`,
    };

    dispatch(saveSchedule(horarioSeleccionado));
  };

  const validarHoras = (dia) => {
    const inicio = moment(
      [parseInt(newSchedule[dia].startH), parseInt(newSchedule[dia].startM)],
      "HH:mm"
    );
    const final = moment(
      [parseInt(newSchedule[dia].finishH), parseInt(newSchedule[dia].finishM)],
      "HH:mm"
    );
    return inicio.isBefore(final);
  };

  const crearHorario = () => {
    if (!currentGroup) {
      notificacion("Seleccione un Grupo", "warning", 1);
    }

    if (!currentSubject) {
      notificacion("Seleccione una Materia", "warning", 2);
    }

    if (!currentTeacher) {
      notificacion("Seleccione un Maestro", "warning", 3);
    }
    const encabezado =
      currentGroup == null || currentSubject == null || currentTeacher == null;

    console.log(newSchedule);

    for (const property in newSchedule) {
      console.log(newSchedule[property]);
      if (!encabezado && !checkbox[property])
        if (
          validarHoras(property) &&
          newSchedule[property].classroom &&
          newSchedule[property].classroom !== "Selecciona un salón"
        ) {
          enviarHorario(property);
        } else {
          notificacion(
            `Revise que los datos del horario ${property} esten correctos`,
            "error",
            property
          );
        }
    }
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
                  value={currentGroup || ""}
                >
                  <option>Selecciona un grupo</option>
                  {groups?.map((grupo) => {
                    return (
                      <option key={grupo.nombre} value={grupo.nombre}>
                        {grupo.nombre}
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
                value={currentTeacher || ""}
              >
                <option value="">Selecciona un profesor</option>
                {teachers?.map((maestro) => {
                  return (
                    <option key={maestro.Maestro} value={maestro.Maestro}>
                      {`${maestro.Nombres} ${maestro.ApellidoM} ${maestro.ApellidoP}`}
                    </option>
                  );
                })}
              </select>
            </Select>

            <Item className=" col-xl-2">
              <ItemHora dia="Lunes" status={checkbox.lunes} />
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
              <ItemHora dia="Martes" status={checkbox.martes} />
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
              <ItemHora dia="Miercoles" status={checkbox.miercoles} />
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
              <ItemHora dia="Jueves" status={checkbox.jueves} />
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
              <ItemHora dia="Viernes" status={checkbox.viernes} />
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
