import axios from "axios";
import { BASE_API_URL } from "../shared/consts/envar";

function maestrosService() {
  function getOne(id) {
    return axios({
      baseURL: BASE_API_URL,
      method: "GET",
      url: `/maestros/${id}`,
    });
  }
  function getHorario(id) {
    return axios({
      baseURL: BASE_API_URL,
      method: "GET",
      url: `/maestros/${id}/horarios`,
    });
  }
  function getMateria(clvMateria) {
    return axios({
      baseURL: BASE_API_URL,
      method: "GET",
      url: `/maestros/materias/${clvMateria}`,
    });
  }
  return {
    getOne,
    getHorario,
    getMateria,
  };
}

export default maestrosService;
