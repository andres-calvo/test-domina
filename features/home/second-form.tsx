import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SignService from "../../services/sign.service";
import { Camera } from "./camera";
import styles from "./Home.module.scss";
const signService = new SignService();

export const SecondForm = ({ identification = "" }) => {
  const methods = useForm();
  const { register, handleSubmit } = methods;
  const [img, setImg] = useState("");

  const onSubmit = async (data, e) => {
    // console.log(data, img);
    if (img.length == 0) {
      return;
    }
    const formattedImg = img.split("base64,")[1];

    try {
      await signService.validate({ ...data, image: formattedImg, identification });
      Swal.fire({
        title: "Validación exitosa",
        text: "La verificación de cédula ha finalizado exitosamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "El documento ingresado no corresponde con la identificación del usuario",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };
  const onError = (errors, e) => console.log(errors, e);
  return (
    <form className={styles.secondForm} onSubmit={handleSubmit(onSubmit, onError)}>
      <label>
        Escriba la clave
        <input
          type="text"
          {...register("otpCode", {
            required: "Escriba la clave",
          })}
        />
      </label>
      <Camera setImg={setImg} />
      {/* {img && <img src={img} alt="" />} */}
      <button type="submit">Enviar</button>
    </form>
  );
};
