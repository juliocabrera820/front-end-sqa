import gruposService from "../../services/gruposService";
import { Group } from "../types";
import notificacion from "../../componentes/notificacion";
import { getSubjects } from "./subjectsAction";

export const getGroups = () => async (dispatch) => {
  try {
    setLoading(dispatch);
    const { data } = await gruposService().getAll();
    getGroupsSuccessful(dispatch, data.data);
  } catch (error) {
    getGroupsError(dispatch, error);
    notificacion("Hubo un error con los grupos", "error", 1);
  }
};

const getGroupsSuccessful = (dispatch, groups) =>
  dispatch({
    type: Group.GET_GROUPS_SUCCESSFUL,
    payload: groups,
  });

const getGroupsError = (dispatch, error) =>
  dispatch({
    type: Group.GET_GROUPS_ERROR,
    payload: error,
  });

const setLoading = (dispatch) =>
  dispatch({
    type: Group.GET_GROUPS,
  });

export const setCurrentGroup = (group) => (dispatch) => {
  dispatch({
    type: Group.SET_CURRENT_GROUP,
    payload: group,
  });
  dispatch(getSubjects(group));
};
