import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notificacion = (message, type, id) => {
  const time = type == "error" ? 15000 : 2000;

  toast.configure({
    autoClose: time,
    draggable: false,
    position: toast.POSITION.BOTTOM_RIGHT,
  });
  return toast(message, {
    type: type,
    toastId: id,
  });
};

export default Notificacion;
