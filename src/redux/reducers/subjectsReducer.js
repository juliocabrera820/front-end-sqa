import { Subject } from "../types";

const initialState = {
  subjects: null,
  currentSubject: null,
  isLoading: false,
  error: false,
  messageError: null,
};

const subjectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Subject.GET_SUBJECTS_SUCCESSFUL:
      return (state = {
        ...state,
        subjects: payload,
        isLoading: false,
        currentSubject: null,
      });
    case Subject.GET_SUBJECTS_ERROR:
      return (state = {
        ...state,
        isError: true,
        errorMessage: payload,
        isLoading: false,
        subjects: null
      });
    case Subject.GET_SUBJECTS:
      return (state = {
        ...state,
        isLoading: true,
      });
    case Subject.SET_CURRENT_SUBJECT:
      return (state = {
        ...state,
        currentSubject: payload,
      });
    default:
      return state;
  }
};

export default subjectReducer;
