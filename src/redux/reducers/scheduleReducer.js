import { Schedule } from "../types";

const initalState = {
  currentSchedule: null,
  isLoading: false,
};

const sessionReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case Schedule.GET_SCHEDULE:
      return (state = {
        ...state,
        isLoading: true,
      });
    case Schedule.GET_SCHEDULE_SUCCESSFUL:
      return (state = {
        ...state,
        currentSchedule: payload,
        isLoading: false,
      });

    case Schedule.GET_SCHEDULE_ERROR:
      return (state = {
        ...state,
        currentSchedule: payload,
      });
    default:
      return state;
  }
};

export default sessionReducer;
