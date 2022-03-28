import { createContext, useState } from "react";
import { CameraIcons } from "./camera-icons";
import { CameraMessage } from "./camera-message";
import { CameraVideo } from "./camera-video";
import styles from "./camera.module.scss";
const defaultFunctions = {
  restartCamera: () => {},
  takePicture: () => {},
};
export const CameraContext = createContext({
  cameraFunctions: defaultFunctions,
  setCameraFunctions: (data: any) => {},
});
export const Camera = ({ setImg }) => {
  const [cameraFunctions, setCameraFunctions] = useState(defaultFunctions);

  const onTakenPicture = (img) => {
    setImg(img);
  };
  return (
    <CameraContext.Provider value={{ cameraFunctions, setCameraFunctions }}>
      <div className={styles.wrapper}>
        <CameraVideo onTakenPicture={onTakenPicture} />
        <div className={styles.bottom}>
          <CameraMessage />
          <CameraIcons />
        </div>
      </div>

      {/* <img src={imgA} alt="" /> */}
    </CameraContext.Provider>
  );
};
