import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
export default Toast;
