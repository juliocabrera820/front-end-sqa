import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from '../../shared/hooks/useSession'
import imagen from "../../assets/aula.jpeg";
import signin from "../../assets/iniciar-sesion.png";
import {Img,Titulo,Cuerpo,Seccion,Input,InputF,Button,Formato} from './styles';

toast.configure({
  autoClose: 2000,
  draggable: false,
  position: toast.POSITION.BOTTOM_RIGHT,
});

function Login(props) {
  const { history } = props;
  const { register, handleSubmit, errors } = useForm();
  const [session, setSession] = useSession()

  const onSubmit = (data, event) => {
    login(data);
  };

  const notify = (error) =>
    toast(error, {
      type: toast.TYPE.ERROR,
      toastId: 1,
    });

  const login = (data) => {
    axios
      .get(`http://localhost/SGH-BackEnd/api/usuarios/${data["username"]}`)
      .then((response) => {
        if (response.data.data[0]["Usuario"] === data["username"]) {
          if (response.data.data[0]["contrasena"] === data["password"]) {
            if (response.data.data[0]["TipoUser"] === "1") {
              setSession({Usuario: response.data.data[0]["Usuario"], TipoUser: response.data.data[0]["TipoUser"]})
              history.push("/Administrador");
            } else {
              if (response.data.data[0]["TipoUser"] === "2") {
                setSession({Usuario: response.data.data[0]["Usuario"], TipoUser: response.data.data[0]["TipoUser"]})
                history.push("/Maestro");
              } else {
                setSession({Usuario: response.data.data[0]["Usuario"], TipoUser: response.data.data[0]["TipoUser"]})
                history.push("/Alumno");
              }
            }
          } else {
            notify("contraseña invalida");
          }
        } else {
          notify("usuario y contraseña invalida");
        }
      })
      .catch((error) => notify("Error al conectarse al servidor"));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-5">
          <Img src={imagen} alt="imagen"></Img>
        </div>
        <div className="col-7 ">
          <Seccion className="col-sm-8 ">
            <Titulo className="col-12 text-center">BIENVENIDO</Titulo>

            <Cuerpo className="col-12 text-center">
              Ingresa tu usuario para consultar tu horario
            </Cuerpo>
            <div className="col-12">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Formato>
                  <InputF className="form-group">
                    <label className="Control-label">Usuario:</label>
                    <Input
                      type="text"
                      className={`form-control ${
                        errors.username ? "is-invalid" : "is-valid"
                      }`}
                      name="username"
                      placeholder="Ingresa tu usuario"
                      ref={register({
                        required: "Debes ingresar un usuario valido",
                        validate: (username) =>
                          username.trim() !== "" ||
                          "No debe tener espacios en blanco",
                      })}
                    />
                    <div className="invalid-feedback">
                      {errors.username && errors.username.message}
                    </div>
                  </InputF>
                </Formato>

                <Formato>
                  <InputF className="form-group">
                    <label className="Control-label">Contraseña:</label>
                    <Input
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : "is-valid"
                      }`}
                      name="password"
                      placeholder="Ingresa tu contraseña"
                      ref={register({
                        required: "Debes ingresar una contraseña valida",
                        validate: (password) =>
                          password.trim() !== "" ||
                          "No debe tener espacios en blanco",
                      })}
                    />
                    <div className="invalid-feedback">
                      {errors.password && errors.password.message}
                    </div>
                  </InputF>
                </Formato>
                <div className="col-12 text-center">
                  <Button className="btn btn-light">
                    Entrar <img src={signin} alt="entrar"></img>{" "}
                  </Button>
                </div>
              </form>
            </div>
          </Seccion>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
