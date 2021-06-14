import React from "react";
import { useForm } from "react-hook-form";
import imagen from "../../assets/aula.jpeg";
import signin from "../../assets/iniciar-sesion.png";
import { Redirect } from "react-router-dom";
import {
  Img,
  Titulo,
  Cuerpo,
  Seccion,
  Input,
  InputF,
  Button,
  Formato,
} from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/loginSchema";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/sessionAction";
import { useUser } from "../../shared/hooks/useUser";

function Login() {
  const dispatch = useDispatch();
  const { redirectTo } = useUser();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    dispatch(login(data.username, data.password));
  };

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-5 overflow-hidden">
          <Img src={imagen} alt="imagen"/>
        </div>
        <div className="col-lg-7">
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

export default Login;
