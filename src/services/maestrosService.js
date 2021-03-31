import axios from "axios";
import { API_URL } from "../shared/consts/envar";

function maestrosService() {
  function getOne(id) {
    return axios({ baseURL: API_URL, method: "GET", url: `/maestros/${id}` });
  }
  function getHorario(id) {
    return axios({
      baseURL: API_URL,
      method: "GET",
      url: `/maestros/${id}/horarios`,
    });
  }
  function getMaterias(id) {
    return axios({
      baseURL: API_URL,
      method: "GET",
      url: `/maestros/materias/${id}`,
    });
  }
  return {
    getOne,
    getHorario,
    getMaterias,
  };
}

export default maestrosService;
