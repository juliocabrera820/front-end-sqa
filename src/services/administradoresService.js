import axios from "axios";
import { API_URL } from "../shared/consts/envar";

function administradoresService() {
  function getOne(id) {
    return axios({
      baseURL: API_URL,
      method: "GET",
      url: `/administradores/${id}`,
    });
  }
  return {
    getOne,
  };
}

export default administradoresService;
