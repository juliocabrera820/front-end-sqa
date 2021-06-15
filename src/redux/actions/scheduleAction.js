import scheduleService from "../../services/horariosService";
import { Schedule } from "../types";
import notificacion from "../../componentes/notificacion";

export const getSchedule = (id, token, typeUser) => async (dispatch) => {
  try {
    setLoading(dispatch);
    const { data } = await scheduleService().get(id, token, typeUser);
    console.log(data);
    getScheduleSuccessful(dispatch, data);
    data.length === 0 &&
      notificacion("No tienes un horario asignado", "warning", 1);
  } catch (error) {
    console.log(error);
    getScheduleError(dispatch, error);
    notificacion("Hubo un error con el horario", "error", 1);
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

export const selectClassroom = (day, classroom) => (dispatch) => {
  dispatch({
    type: Schedule.SELECT_CLASSROOM,
    payload: { day, classroom },
  });
};

export const selectStartHour = (day, sh) => (dispatch) => {
  dispatch({
    type: Schedule.SELECT_START_HOUR,
    payload: { day, sh },
  });
};

export const selectStartMinutes = (day, sm) => (dispatch) => {
  dispatch({
    type: Schedule.SELECT_START_MINUTES,
    payload: { day, sm },
  });
};

export const selectFinishHour = (day, fh) => (dispatch) => {
  dispatch({
    type: Schedule.SELECT_FINISH_HOUR,
    payload: { day, fh },
  });
};

export const selectFinishMinutes = (day, fm) => (dispatch) => {
  dispatch({
    type: Schedule.SELECT_FINISH_MINUTES,
    payload: { day, fm },
  });
};

export const cleanSchedule = () => (dispatch) => {
  dispatch({
    type: Schedule.CLEAN_SCHEDULE,
  });
};
