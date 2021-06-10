import axios from "axios";
import { BASE_API_URL } from "../shared/consts/envar";

function horariosService() {
  function get(id, token, tipoUsuario) {
    return axios({
      baseURL: BASE_API_URL,
      method: "GET",
      url: `/${tipoUsuario}/${id}/horarios`,
      headers: {
        Authorization: token,
      },
    });
  }

  function create(horario, token) {
    return axios({
      baseURL: BASE_API_URL,
      method: "POST",
      url: "/horarios",
      data: horario,
      headers: { 'Authorization': token }
    });
  }
  return {
    get,
    create,
  };
}

export default horariosService;