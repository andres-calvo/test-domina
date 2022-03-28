import styles from "./camera.module.scss";
export const CameraMessage = () => {
  return (
    <div className={styles.message}>
      <h4>Cara frontal de la cédula</h4>
      <p>
        Asegúrate de ubicar tu identificación en el recuadro asignado y que se encuentre en
        condiciones de luz legibles.
      </p>
    </div>
  );
};
