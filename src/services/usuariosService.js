import axios from "axios";
import { API_URL } from "../shared/consts/envar";

function usuariosService() {
  function getAll() {
    return axios({ baseURL: API_URL, method: "GET", url: "/usuarios" });
  }
  function getOne(id) {
    return axios({ baseURL: API_URL, method: "GET", url: `/usuarios/${id}` });
  }
  return {
    getAll,
    getOne,
  };
}

export default usuariosService;
