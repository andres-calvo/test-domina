import { useForm } from "react-hook-form";
import { Base64Service } from "../../services/base64.service";
import SignService from "../../services/sign.service";
import { imageValidation } from "../../utils/image-validation";
import styles from "./Home.module.css";
const signService = new SignService();
export const SecondForm = ({ identification }) => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const watchForm = watch();
  const onSubmit = async (data, e) => {
    console.log(data, e);
    const base64Service = new Base64Service();
    const photo = await base64Service.toBase64(data.photo);
    await signService.validate({ ...data, identification });
  };
  const onError = (errors, e) => console.log(errors, e);
  console.log(watchForm["cedula"]);
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
      <label className={styles.fileInput}>
        Subir cedula
        <input
          type="file"
          accept="image/png, image/jpeg"
          {...register("photo", {
            required: "La foto de la cédula es requerida",
            validate: async (img) => {
              const resp = await imageValidation(img);
              const valid = resp !== "Unknown filetype";
              !valid && setValue("photo", null);

              return valid;
            },
          })}
        />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
};
