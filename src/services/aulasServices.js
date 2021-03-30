import axios from "axios";
import { API_URL } from "../shared/consts/envar";

function aulasServices() {
  function getAll() {
    return axios({ baseURL: API_URL, method: "GET" });
  }
  return {
    getAll,
  };
}

export default aulasService;
