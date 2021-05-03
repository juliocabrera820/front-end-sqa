import { useDispatch, useSelector } from "react-redux";

export const useSession = () => {
  const dispatch = useDispatch();
  const { session: currentSession } = useSelector((state) => state);

  const session = () => currentSession;

  const setSession = (usuario) => {
    dispatch({
      type: "SET_SESSION",
      payload: { isLoggedIn: true, ...usuario },
    });
  };

  return [session, setSession];
};