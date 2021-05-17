import { Schedule } from "../types";

const initialState = {
  currentSchedule: null,
  isLoading: false,
  newSchedule: {},
};

let newState;

const sessionReducer = (state = initialState, { type, payload }) => {
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
    case Schedule.SELECT_CLASSROOM:
      newState = { ...state };
      newState.newSchedule[payload.day] = {
        ...newState.newSchedule[payload.day],
        classroom: payload.classroom,
      };
      return newState;
    case Schedule.SELECT_START_HOUR:
      newState = { ...state };
      newState.newSchedule[payload.day] = {
        ...newState.newSchedule[payload.day],
        startH: payload.sh,
      };
      return newState;
    case Schedule.SELECT_START_MINUTES:
      newState = { ...state };
      newState.newSchedule[payload.day] = {
        ...newState.newSchedule[payload.day],
        startM: payload.sm,
      };
      return newState;
    case Schedule.SELECT_FINISH_HOUR:
      newState = { ...state };
      newState.newSchedule[payload.day] = {
        ...newState.newSchedule[payload.day],
        finishH: payload.fh,
      };
      return newState;
    case Schedule.SELECT_FINISH_MINUTES:
      newState = { ...state };
      newState.newSchedule[payload.day] = {
        ...newState.newSchedule[payload.day],
        finishM: payload.fm,
      };
      return newState;
    case Schedule.CLEAN_SCHEDULE:
      return (state = { ...state, newSchedule: {} });
    default:
      return state;
  }
};

export default sessionReducer;
