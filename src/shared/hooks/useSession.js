import { useDispatch, useSelector } from "react-redux";

export const useSession = () => {
  const dispatch = useDispatch();
  const { Usuario } = useSelector((state) => state);

  const session = () => Usuario;

  const setSession = (usuario) => {
    dispatch({
      type: "SET_USUARIO",
      payload: usuario,
    });
  };

  return [session, setSession];
};
