import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';

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
    <div style={{width:"100%"}}>
      <div className="camera-btns" style={{display:"flex", justifyContent:"space-around"}}>
        <Button variant="contained" onClick={startCapture}>Start Camera</Button>
        <Button variant="contained" onClick={capturePhoto}>Capture Photo</Button>
      </div>
      <Webcam
        audio={false}
        height={200}
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

        <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
    </div>
  );
};

export default Camera;
