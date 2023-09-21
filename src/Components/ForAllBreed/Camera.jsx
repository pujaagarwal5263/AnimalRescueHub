import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const Camera = (props) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  // Function to start capturing the camera feed
  const startCapture = () => {
    // Access the camera using the getUserMedia API
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing the camera:", error);
      });
  };

  // Function to capture a photo from the camera feed
  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      props.onAdd(imageSrc);
    }
  };

  return (
    <div>
      <button onClick={startCapture}>Start Camera</button>
      <button onClick={capturePhoto}>Capture Photo</button>
      <Webcam
        audio={false}
        height={400}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
      />
      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured"
          style={{ marginTop: "20px", width: "100%" }}
        />
      )}
    </div>
  );
};

export default Camera;
