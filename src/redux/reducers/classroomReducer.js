import { Classroom } from "../types";

const initialState = {
  classrooms: null,
  currentclassroom: null,
  isLoading: false,
  error: false,
  messageError: null,
};

const groupsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Classroom.GET_CLASSROOM:
      return (state = {
        ...state,
        isLoading: true,
      });
    case Classroom.GET_CLASSROOM_SUCCESSFUL:
      return (state = {
        ...state,
        classrooms: payload,
        isLoading: false,
      });

    case Classroom.GET_CLASSROOM_ERROR:
      return (state = {
        ...state,
        error: payload,
      });
    case Classroom.SET_CURRENT_CLASSROOM:
      return (state = {
        ...state,
        currentclassroom: payload,
      });
    default:
      return state;
  }
};

export default groupsReducer;
