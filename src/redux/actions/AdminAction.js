import scheduleService from "../../services/horariosService";
import { Admin } from "../types";
import notificacion from "../../componentes/notificacion";

export const saveSchedule = (newSchedule) => async (dispatch) => {
  try {
    const { data } = await scheduleService().create(newSchedule);
    if (data.data === "Horario Creado.") {
      notificacion(
        `El horario del ${newSchedule.dia} ha sido cargado exitosamente`,
        "success",
        1
      );
    } else {
      let mensaje = `No se puede guardar el horario del ${newSchedule.dia}. `;
      data.data.aula ? (mensaje += "Aula ocupada. ") : (newSchedule.dia += " ");
      data.data.grupo
        ? (mensaje += "El grupo ya tienen una materia en esa hora. ")
        : (mensaje += " ");
      data.data.maestro
        ? (mensaje += "El  Maestro ya tienen una materia asignada a esa hora.")
        : (mensaje += "");
      notificacion(mensaje, "error", 1);
    }
  } catch (error) {
    console.log(error);
    notificacion("Hubo un error en el servidor", "error", 1);
  }
};
