import { Schedule } from "../types";

const initalState = {
  currentSchedule: null,
  isLoading: false,
  isError: null,
  errorMessage: null,
};

const sessionReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case Schedule.GET_SCHEDULE:
      return (state = {
        ...state,
        currentSchedule: payload.schedule,
      });
    case Schedule.GET_SCHEDULE_SUCCESSFUL:
      return (state = {
        ...state,
        currentSchedule: payload.schedule,
      });

    case Schedule.GET_SCHEDULE_ERROR:
      return (state = {
        ...state,
        currentSchedule: payload.schedule,
      });
    default:
      return state;
  }
};

export default sessionReducer;
