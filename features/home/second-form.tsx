import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SignService from "../../services/sign.service";
import { Camera } from "./camera";
import styles from "./Home.module.scss";
const signService = new SignService();
const defaultFunctions = {
  restartCamera: () => {},
  takePicture: () => {},
  shutDownCamera: () => {},
};
export const CameraContext = createContext({
  cameraFunctions: defaultFunctions,
  setCameraFunctions: (data: any) => {},
});
export const SecondForm = ({ orderNumber = "" }) => {
  const [cameraFunctions, setCameraFunctions] = useState(defaultFunctions);
  const [step, setStep] = useState(1);
  const [img, setImg] = useState("");
  useEffect(() => {
    if (step == 1) {
      setImg("");
    }
    if (step == 2) {
      cameraFunctions.shutDownCamera();
    }
  }, [step]);

  return (
    <CameraContext.Provider value={{ cameraFunctions, setCameraFunctions }}>
      {step == 1 && <CameraStep img={img} setImg={setImg} setStep={setStep} />}
      {step == 2 && <FinalStep img={img} setStep={setStep} orderNumber={orderNumber} />}
    </CameraContext.Provider>
  );
};

const CameraStep = ({ setStep, setImg, img }) => {
  return (
    <div className={styles.secondForm}>
      <Camera setImg={setImg} />
      <button type="button" disabled={img.length == 0} onClick={() => setStep(2)}>
        Continuar
      </button>
    </div>
  );
};
const FinalStep = ({ img, orderNumber, setStep }) => {
  const methods = useForm({
    mode: "onSubmit",
  });
  const { register, handleSubmit } = methods;
  const onSubmit = async (data, e) => {
    // console.log(data, img);
    if (img.length == 0) {
      return;
    }
    const formattedImg = img.split("base64,")[1];

    try {
      await signService.validate({ ...data, image: formattedImg, orderNumber });
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
        <span style={{ fontSize: "smaller", color: "grey" }}>Codigo OTP enviado al teléfono</span>
        <input
          type="text"
          {...register("otpCode", {
            required: "Escriba la clave",
          })}
        />
      </label>
      <div
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <button type="button" onClick={() => setStep(1)}>
          Volver
        </button>
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
};
