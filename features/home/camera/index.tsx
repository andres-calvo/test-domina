import { CameraIcons } from "./camera-icons";
import { CameraVideo } from "./camera-video";
import styles from "./camera.module.scss";

export const Camera = ({ setImg }) => {
  const onTakenPicture = (img) => {
    setImg(img);
  };

  return (
    <div className={styles.wrapper}>
      <img src="/images/icons/rectangulo.svg" className={styles.rectangle} />
      <CameraVideo onTakenPicture={onTakenPicture} />
      <div className={styles.bottom}>
        {/* <CameraMessage /> */}
        <CameraIcons />
      </div>
    </div>
  );
};
