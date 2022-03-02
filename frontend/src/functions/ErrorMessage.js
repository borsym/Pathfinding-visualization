import { toast } from "react-toastify";
const warningMessage = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export default warningMessage;
