import scheduleService from "../../services/horariosService";
import { Admin } from "../types";
import notificacion from "../../componentes/notificacion";

export const saveSchedule = (user, token, newSchedule) => async (dispatch) => {
  try {
    const { data } = await scheduleService().create(user, token, newSchedule);
    notificacion(
      `El horario del ${newSchedule.dia} ha sido cargado exitosamente`,
      "success",
      1
    );
  } catch (error) {
    if (error.response) {
      notificacion(
        `Error: ${newSchedule.dia}, el horario del elegido y la aula translapan`,
        "error",
        1
      );
    } else if (error.request) {
      notificacion(error.request, "error", 1);
    } else {
      notificacion(error.message, "error", 1);
    }
  }
};
