import React from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usuariosService from '../../services/usuariosService'
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
  const estado = useSelector((state) => state);
  const dispatch = useDispatch();

  const onSubmit = (data, event) => {
    login(data);
  };

  const notify = (error) =>
    toast(error, {
      type: toast.TYPE.ERROR,
      toastId: 1,
    });

  const login = ({username, password}) => {
      usuariosService().getOne(username)
      .then((response) => {
        if (response.data.data[0]["Usuario"] === username) {
          if (response.data.data[0]["contrasena"] === password) {
            if (response.data.data[0]["TipoUser"] === "1") {
              dispatch({
                type: "SET_USUARIO",
                payload: response.data.data[0],
              });
              history.push("/Administrador");
            } else {
              if (response.data.data[0]["TipoUser"] === "2") {
                dispatch({
                  type: "SET_USUARIO",
                  payload: response.data.data[0],
                });

                history.push("/Maestro");
              } else {
                dispatch({
                  type: "SET_USUARIO",
                  payload: response.data.data[0],
                });

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
