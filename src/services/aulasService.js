import axios from "axios";
import { BASE_API_URL } from "../shared/consts/envar";

function aulasService() {
  function getAll() {
    return axios({ baseURL: BASE_API_URL, method: "GET", url: "/aulas" });
  }
  return {
    getAll,
  };
}

export default aulasService;
