import { Group } from "../types";

const initialState = {
  groups: null,
  currentGroup: null,
  isLoading: false,
  error: false,
  messageError: null,
};

const groupsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Group.GET_GROUPS:
      return (state = {
        ...state,
        isLoading: true,
      });
    case Group.GET_GROUPS_SUCCESSFUL:
      return (state = {
        ...state,
        groups: payload,
        isLoading: false,
      });

    case Group.GET_GROUPS_ERROR:
      return (state = {
        ...state,
        error: payload,
      });
    case Group.SET_CURRENT_GROUP:
      return (state = {
        ...state,
        currentGroup: payload,
      });
    default:
      return state;
  }
};

export default groupsReducer;
