import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("El nombre de usuario es un campo requerido"),
  password: yup.string().trim().required("La contraseña es un campo requerido"),
});
