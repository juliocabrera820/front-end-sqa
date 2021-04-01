import axios from "axios";
import { BASE_API_URL} from "../shared/consts/envar";

function usuariosService() {
  function getAll() {
    return axios({ baseURL: BASE_API_URL, method: "GET", url: "/usuarios" });
  }
  function getOne(id) {
    return axios({ baseURL: BASE_API_URL, method: "GET", url: `/usuarios/${id}` });
  }
  return {
    getAll,
    getOne,
  };
}

export default usuariosService;