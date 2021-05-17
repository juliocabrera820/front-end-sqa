import TeacherService from "../../services/maestrosService";
import { Subject, Teacher } from "../types";
import notificacion from "../../componentes/notificacion";

export const getTeachers = (id) => async (dispatch) => {
  try {
    setLoading(dispatch);
    const { data } = await TeacherService().getMateria(id);
    getTeachersSuccessful(dispatch, data.data);
  } catch (error) {
    getTeachersError(dispatch, error);
    notificacion("Hubo un error con las maestros", "error", 1);
  }
};

const getTeachersSuccessful = (distpatch, teachers) => {
  distpatch({
    type: Teacher.GET_TEACHERS_SUCCESSFUL,
    payload: teachers,
  });
};

const getTeachersError = (dispatch, error) =>
  dispatch({
    type: Teacher.getTeachersError,
    payload: error,
  });

const setLoading = (dispatch) =>
  dispatch({
    type: Teacher.GET_TEACHERS,
  });

export const setCurrentTeacher = (teacher) => (dispatch) => {
  dispatch({
    type: Teacher.SET_CURRENT_TEACHER,
    payload: teacher,
  });
};

export const setCurrentSubject = (subject) => (dispatch) => {
  dispatch({
    type: Subject.SET_CURRENT_SUBJECT,
    payload: subject,
  });
  dispatch(getTeachers(subject.clv_materia));
};
