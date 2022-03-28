import { useContext, useEffect, useRef } from "react";
import getElementSize from "utils/get-element-size";
import { CameraContext } from ".";
import styles from "./camera.module.scss";
export const CameraVideo = ({
  onLoadSuccess = () => {},
  onError = () => {},
  onTakenPicture = (img: any) => {},
}) => {
  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef(null);
  const { setCameraFunctions } = useContext(CameraContext);
  const main = async () => {
    const hasCamera = await setupCamera();
    if (!hasCamera) return;
    webcamRef.current.setAttribute("muted", "");
    webcamRef.current.setAttribute("autoplay", "");
    webcamRef.current.setAttribute("playsinline", "");
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: { facingMode: "environment" } })
      .then((stream) => {
        streamRef.current = stream;
        webcamRef.current.srcObject = stream;
        onLoadSuccess();
      })
      .catch((error) => onError());
  };
  const stopVideo = () => {
    webcamRef.current.pause();
    webcamRef.current.currentTime = 0;
  };
  const restartCamera = () => {
    webcamRef.current.play();
    const ctx = canvasRef.current.getContext("2d");
    const width = getElementSize(webcamRef.current, "width");
    const height = getElementSize(webcamRef.current, "height");
    ctx.clearRect(0, 0, width, height);
    ctx.transform(-1, 0, 0, 1, width, 0);
    // canvasRef.current.style.display = "none"
  };
  const takePicture = () => {
    const width = getElementSize(webcamRef.current, "width");
    const height = getElementSize(webcamRef.current, "height");
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    console.log(width, height);
    ctx.transform(-1, 0, 0, 1, width, 0);
    ctx.drawImage(webcamRef.current, 0, 0, width, height);
    const image = canvas.toDataURL("image/png");
    // canvasRef.current.style.display = "block"

    onTakenPicture(image);
    stopVideo();
  };
  useEffect(() => {
    main();
  }, []);
  useEffect(() => {
    setCameraFunctions({
      takePicture,
      restartCamera,
    });
  }, [webcamRef, canvasRef]);

  return (
    <div className={styles.videoWrapper}>
      <video
        ref={webcamRef}
        // width={sizeCamera.width}
        // height={sizeCamera.height}
        className={styles.camera}
        muted={true}
        autoPlay
        playsInline
        id="video"
        onLoadedMetadata={() => {
          console.log("Cargue Video");
        }}
      ></video>
      <canvas
        style={{ display: "none" }}
        // width={sizeCamera.width}
        // height={sizeCamera.height}
        ref={canvasRef}
      ></canvas>
    </div>
  );
};

async function setupCamera() {
  // Start the permission.
  let hasCamera = false;
  if (navigator.permissions && navigator.permissions.query) {
    // TryCatch for firefox not having camera in permission API
    try {
      const query: PermissionDescriptor = { name: "camera" as PermissionName };
      await navigator.permissions.query(query);
      hasCamera = true;
    } catch (error) {
      const stream = await navigator.mediaDevices
        .getUserMedia({ audio: false, video: true })
        .catch(() => {
          hasCamera = false;
        });
      if (stream) hasCamera = true;
    }
  } else {
    return true;
  }
  return hasCamera;
}
