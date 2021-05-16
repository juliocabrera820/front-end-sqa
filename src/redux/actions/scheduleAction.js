import scheduleService from "../../services/horariosService";
import { Schedule } from "../types";
import notificacion from "../../componentes/notificacion";

export const getSchedule = (id, typeUser) => async (dispatch) => {
  try {
    setLoading(dispatch);
    const { data } = await scheduleService().get(id, typeUser);
    getScheduleSuccessful(dispatch, data.data);
    data.data.length === 0 &&
      notificacion("No tienes un horario asignado", "warning");
  } catch (error) {
    getScheduleError(dispatch, error);
    notificacion("Hubo un error con el horario", "error");
  }
};

const getScheduleSuccessful = (distpatch, schedule) =>
  distpatch({
    type: Schedule.GET_SCHEDULE_SUCCESSFUL,
    payload: schedule,
  });

const getScheduleError = (dispatch, error) =>
  dispatch({
    type: Schedule.GET_SCHEDULE_ERROR,
    payload: error,
  });

const setLoading = (dispatch) =>
  dispatch({
    type: Schedule.GET_SCHEDULE,
  });
