import axios from "axios";
import { BASE_API_URL } from "../shared/consts/envar";

function aulasService() {
  function getAll(token) {
    return axios({ baseURL: BASE_API_URL, method: "GET", url: "/aulas", headers: { Authorization: token } });
  }
  return {
    getAll,
  };
}

export default aulasService;
