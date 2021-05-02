import axios from "axios";
import { BASE_API_URL} from "../shared/consts/envar";

function alumnosService() {
  function getOne(id) {
    return axios({ baseURL: BASE_API_URL, method: "GET", url: `/alumnos/${id}` });
  }
  function getHorario(id) {
    return axios({
      baseURL: BASE_API_URL,
      method: "GET",
      url: `/alumnos/${id}/horarios`,
    });
  }
  return {
    getOne,
    getHorario,
  };
}

export default alumnosService;