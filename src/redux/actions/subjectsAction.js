import groupService from "../../services/gruposService";
import { Subject } from "../types";
import notificacion from "../../componentes/notificacion";

export const getSubjects = (id) => async (dispatch) => {
  try {
    setLoading(dispatch);
    const { data } = await groupService().getOne(id);
    getSubjectsSuccessful(dispatch, data.data);
  } catch (error) {
    getSubjectsError(dispatch, error);
    notificacion("Hubo un error con las materias", "error");
  }
};

const getSubjectsSuccessful = (distpatch, subjects) => {
  console.log(subjects);
  distpatch({
    type: Subject.GET_SUBJECTS_SUCCESSFUL,
    payload: subjects,
  });
};

const getSubjectsError = (dispatch, error) =>
  dispatch({
    type: Subject.GET_SUBJECTS_ERROR,
    payload: error,
  });

const setLoading = (dispatch) =>
  dispatch({
    type: Subject.GET_SUBJECTS,
  });

export const setCurrentSubject = (subject) => (dispatch) => {
  dispatch({
    type: Subject.SET_CURRENT_SUBJECT,
    payload: subject,
  });
};