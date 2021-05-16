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
  return {
    get,
  };
}

export default horariosService;
