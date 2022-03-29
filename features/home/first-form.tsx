import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SignService, { ISendIndentification } from "../../services/sign.service";
import styles from "./Home.module.scss";
const signService = new SignService();
export const FirstForm = ({ setStage, setIdentification }) => {
  const { register, handleSubmit } = useForm<ISendIndentification>();
  const onSubmit = async (data: ISendIndentification, e) => {
    try {
      await signService.sendIdentification(data);
      setIdentification(data.identification);
      setStage(2);
    } catch (error) {
      Swal.fire("Error", "La cedula ingresada no se encuentra registrada", "error");
    }
  };
  const onError = (errors, e) => console.log(errors, e);
  return (
    <form className={styles.firstForm} onSubmit={handleSubmit(onSubmit, onError)}>
      <label>
        Numero de identificación
        <input
          type="text"
          {...register("identification", {
            required: "El numero de pedido es requerido",
          })}
          autoComplete="false"
        />
      </label>

      <button type="submit">Enviar</button>
    </form>
  );
};
