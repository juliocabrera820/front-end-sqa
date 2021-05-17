import axios from "axios";
import { BASE_API_URL } from "../shared/consts/envar";

function horariosService() {
  function get(id, tipoUsuario) {
    return axios({
      baseURL: BASE_API_URL,
      method: "GET",
      url: `/${tipoUsuario}/${id}/horarios`,
    });
  }
  function create(horario) {
    return axios({
      baseURL: BASE_API_URL,
      method: "POST",
      url: "/horarios",
      data: horario,
    });
  }
  return {
    get,
    create,
  };
}

export default horariosService;
