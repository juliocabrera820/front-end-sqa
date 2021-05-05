import axios from "axios";
import { BASE_API_URL } from "../shared/consts/envar";

function horariosService() {
  function create(horario) {
    return axios({
      baseURL: BASE_API_URL,
      method: "POST",
      url: "/horarios",
      data: horario,
    });
  }
  return {
    create,
  };
}

export default horariosService;
