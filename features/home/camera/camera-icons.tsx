import React, { useContext } from "react"
import { CameraContext } from "."
import styles from "./camera.module.scss"
export const CameraIcons = () => {
  const {
    cameraFunctions: { restartCamera, takePicture },
  } = useContext(CameraContext)

  return (
    <ul className={styles.icons}>
      <li className={styles.icon}>
        <img
          src="/images/icons/chevron-down.svg"
          alt=""
          className={styles.back}
          onClick={restartCamera}
        />
      </li>
      <li className={styles.icon}>
        <img src="/images/icons/close.svg" alt="" onClick={takePicture} />
      </li>
    </ul>
  )
}