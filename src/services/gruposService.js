import axios from "axios";
import { BASE_API_URL} from "../shared/consts/envar";

function gruposService() {
  function getAll() {
    return axios({ baseURL: BASE_API_URL, method: "GET", url: "/grupos" });
  }
  function getOne(id) {
    return axios({ baseURL: BASE_API_URL, method: "GET", url: `/grupos/${id}` });
  }
  return {
    getAll,
    getOne,
  };
}

export default gruposService;