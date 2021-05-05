import schedule from "../../services/horariosService";
import { Schedule } from "../types";

export const getSchedule = (id) => (dispatch) => {
  setLoading(dispatch);
  try {
    setLoading(dispatch);
    //const { data } = await usuariosService().auth(user, password);
    loginSuccessful(dispatch, data);
  } catch (error) {
    loginError(dispatch, error);
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
