import axios from "axios";
import { BASE_API_URL } from "../shared/consts/envar";

function usuariosService() {
  function self(token) {
    return axios({
      baseURL: BASE_API_URL,
      method: "GET",
      url: "/self",
      headers: {
        Authorization: token,
      },
    });
  }

  function auth(username, password) {
    const body = {
      usuario: username,
      contraseña: password,
    };
    return axios({
      baseURL: BASE_API_URL,
      method: "POST",
      url: "/auth",
      data: body,
    });
  }
  return {
    self,
    auth,
  };
}

export default usuariosService;
