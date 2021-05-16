import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notificacion = (message, type) => {
  toast.configure({
    autoClose: 2000,
    draggable: false,
    position: toast.POSITION.BOTTOM_RIGHT,
  });
  return toast(message, {
    type: type,
    toastId: 1,
  });
};

export default Notificacion;
