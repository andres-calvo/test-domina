import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SignService, { ISendIndentification } from "../../services/sign.service";
import styles from "./Home.module.scss";
const signService = new SignService();
export const FirstForm = ({ setStage, setOrderNumber }) => {
  const { register, handleSubmit, watch } = useForm<ISendIndentification>({
    mode: "onChange",
  });
  const watchForm = watch();
  const onSubmit = async (data: ISendIndentification, e) => {
    try {
      await signService.sendIdentification(data);
      setOrderNumber(data.orderNumber);
      setStage(2);
    } catch (error) {
      Swal.fire("Error", "La cedula ingresada no se encuentra registrada", "error");
    }
  };
  const onError = (errors, e) => console.log(errors, e);
  return (
    <form className={styles.firstForm} onSubmit={handleSubmit(onSubmit, onError)}>
      <label>
        Numero de pedido
        <input
          type="text"
          {...register("orderNumber", {
            required: "El numero de pedido es requerido",
          })}
          autoComplete="false"
        />
      </label>

      <button type="submit" disabled={watchForm?.orderNumber?.length <= 3}>
        Enviar
      </button>
    </form>
  );
};
