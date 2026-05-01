import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export function showError(message) {
  MySwal.fire({
    icon: "error",
    title: "Erro",
    text: message,
  });
}

export function showSuccess(message) {
  MySwal.fire({
    icon: "success",
    title: "Sucesso",
    text: message,
  });
}
