import axios from "axios";
import { API_URL } from "../shared/consts/envar";

function horariosService() {
  function create(horario) {
    return axios({
      baseURL: API_URL,
      method: "POST",
      url: "/horarios",
      params: horario,
    });
  }
  return {
    create,
  };
}

export default horariosService;
