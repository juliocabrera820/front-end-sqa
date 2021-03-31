import axios from "axios";
import { API_URL } from "../shared/consts/envar";

function aulasService() {
  function getAll() {
    return axios({ baseURL: API_URL, method: "GET", url: "/aulas" });
  }
  return {
    getAll,
  };
}

export default aulasService;
