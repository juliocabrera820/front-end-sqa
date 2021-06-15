import { Teacher } from "../types";

const initialState = {
  teachers: null,
  currentTeacher: null,
  isLoading: false,
  error: false,
  messageError: null,
};

const subjectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Teacher.GET_TEACHERS_SUCCESSFUL:
      return (state = {
        ...state,
        teachers: payload,
        isLoading: false,
        currentTeacher: null,
      });
    case Teacher.GET_TEACHERS_ERROR:
      return (state = {
        ...state,
        isError: true,
        errorMessage: payload,
        isLoading: false,
      });
    case Teacher.GET_TEACHERS:
      return (state = {
        ...state,
        isLoading: true,
      });
    case Teacher.SET_CURRENT_TEACHER:
      return (state = {
        ...state,
        currentTeacher: payload,
      });
    default:
      return state;
  }
};

export default subjectReducer;
