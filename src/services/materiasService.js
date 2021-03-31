import axios from "axios";
import { API_URL } from "../shared/consts/envar";

function materiasService() {
  function getOne(id) {
    return axios({ baseURL: API_URL, method: "GET", url: `/materias/${id}` });
  }
  return {
    getOne,
  };
}

export default materiasService;
