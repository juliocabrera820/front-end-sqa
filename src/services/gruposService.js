import axios from "axios";
import { BASE_API_URL } from "../shared/consts/envar";

function gruposService() {
  function getAll(token) {
    return axios({ baseURL: BASE_API_URL, method: "GET", url: "/grupos", headers: { Authorization: token } });
  }

  function getOne(id,token) {
    return axios({
      baseURL: BASE_API_URL,
      method: "GET",
      url: `grupos/${id}/materias`,
      headers: { Authorization: token }
    });
  }
  return {
    getAll,
    getOne,
  };
}

export default gruposService;