import classroomsService from "../../services/aulasService";
import { Classroom } from "../types";
import notificacion from "../../componentes/notificacion";

export const getClassrooms = (token) => async (dispatch) => {
  try {
    setLoading(dispatch);
    const { data } = await classroomsService().getAll(token);
    getClassroomSuccessful(dispatch, data);
  } catch (error) {
    getClassroomError(dispatch, error);
    notificacion("Hubo un error con los aulas", "error", 1);
  }
};

const getClassroomSuccessful = (dispatch, classrooms) =>
  dispatch({
    type: Classroom.GET_CLASSROOM_SUCCESSFUL,
    payload: classrooms,
  });

const getClassroomError = (dispatch, error) =>
  dispatch({
    type: Classroom.GET_CLASSROOM_ERROR,
    payload: error,
  });

const setLoading = (dispatch) =>
  dispatch({
    type: Classroom.GET_CLASSROOM,
  });
