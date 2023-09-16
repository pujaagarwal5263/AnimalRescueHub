import React from 'react';
import { useState, useEffect, useRef } from 'react';
import * as tf from "@tensorflow/tfjs";
import { DropzoneArea } from "material-ui-dropzone";
import { Backdrop, Chip, CircularProgress, Grid, Stack } from "@mui/material";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 540,
    facingMode: "environment",
  };

const Breed = () => {
    const [model, setModel] = useState(null);
    const [classLabels, setClassLabels] = useState(null);
    const [loading, setLoading] = useState(false);
    const [confidence, setConfidence] = useState(null);
    const [predictedClass, setPredictedClass] = useState(null);
  
    const webcamRef = useRef(null);
    const [url, setUrl] = React.useState(null);
  
  
    const imagePredictFromClick = async (myurl) =>{
      setUrl(myurl)
      console.log("object...",myurl);
      const image = await createHTMLImageElement(myurl);
  
      // tf.tidy for automatic memory cleanup
      const [predictedClass, confidence] = tf.tidy(() => {
       const tensorImg = tf.browser.fromPixels(image).resizeNearestNeighbor([224, 224]).toFloat().expandDims();
       const result = model.predict(tensorImg);
  
       const predictions = result.dataSync();
       const predicted_index = result.as1D().argMax().dataSync()[0];
  
       const predictedClass = classLabels[predicted_index];
       const confidence = Math.round(predictions[predicted_index] * 100);
  
       return [predictedClass, confidence];
     });
     console.log(predictedClass);
  
     setPredictedClass(predictedClass);
     setConfidence(confidence);
     setLoading(false);
    }
  
    const capturePhoto = React.useCallback(async () => {
      setLoading(true)
      const imageSrc = webcamRef.current.getScreenshot();
      setUrl(imageSrc);
       // Stop capturing by disabling camera
    const tracks = webcamRef.current.stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
  
      imagePredictFromClick(imageSrc);
    }, [webcamRef]);
  
    const onUserMedia = (e) => {
      console.log(e);
    };
  
    useEffect(() => {
      const loadModel = async () => {
        const model_url = "tfjs/MobileNetV3Large/model.json";
  
        const model = await tf.loadGraphModel(model_url);
  
        setModel(model);
      };
  
      const getClassLabels = async () => {
        const res = await fetch(
          "https://raw.githubusercontent.com/anishathalye/imagenet-simple-labels/master/imagenet-simple-labels.json"
        );
  
        const data = await res.json();
  
        setClassLabels(data);
      };
  
      loadModel();
      getClassLabels();
    }, [url]);
  
    const readImageFile = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
  
        reader.onload = () => resolve(reader.result);
  
        reader.readAsDataURL(file);
      });
    };
  
    const createHTMLImageElement = (imageSrc) => {
      return new Promise((resolve) => {
        const img = new Image();
  
        img.onload = () => resolve(img);
  
        img.src = imageSrc;
      });
    };
  
    const handleImageChange = async (files) => {
      if (files.length === 0) {
        setConfidence(null);
        setPredictedClass(null);
      }
  
      if (files.length === 1) {
        setLoading(true);
  
        const imageSrc = await readImageFile(files[0]);
        console.log("imageSrc",imageSrc);
        const image = await createHTMLImageElement(imageSrc);
  
        // tf.tidy for automatic memory cleanup
        const [predictedClass, confidence] = tf.tidy(() => {
          const tensorImg = tf.browser.fromPixels(image).resizeNearestNeighbor([224, 224]).toFloat().expandDims();
          const result = model.predict(tensorImg);
  
          const predictions = result.dataSync();
          const predicted_index = result.as1D().argMax().dataSync()[0];
  
          const predictedClass = classLabels[predicted_index];
          const confidence = Math.round(predictions[predicted_index] * 100);
  
          return [predictedClass, confidence];
        });
  
        setPredictedClass(predictedClass);
        setConfidence(confidence);
        setLoading(false);
      }
    };
  

  return (
    <div>
    <Grid container className="App" direction="column" alignItems="center" justifyContent="center" marginTop="12%">
      <Grid item>
        <h1 style={{ textAlign: "center", marginBottom: "1.5em" }}>MobileNetV3 Image Classifier</h1>
        <DropzoneArea
          acceptedFiles={["image/*"]}
          dropzoneText={"Add an image"}
          onChange={handleImageChange}
          maxFileSize={10000000}
          filesLimit={1}
          showAlerts={["error"]}
        />
        <Stack style={{ marginTop: "2em", width: "12rem" }} direction="row" spacing={1}>
          <Chip
            label={predictedClass === null ? "Prediction:" : `Prediction: ${predictedClass}`}
            style={{ justifyContent: "left" }}
            variant="outlined"
          />
          <Chip
            label={confidence === null ? "Confidence:" : `Confidence: ${confidence}%`}
            style={{ justifyContent: "left" }}
            variant="outlined"
          />
        </Stack>

        <Webcam
      ref={webcamRef}
      audio={true}
      screenshotFormat="image/jpeg"
      videoConstraints={videoConstraints}
      onUserMedia={onUserMedia}
    />
    <button onClick={capturePhoto}>Capture</button>
    <button onClick={() => setUrl(null)}>Refresh</button>
    {url && (
      <div>
        <img src={url} alt="Screenshot" />
      </div>
    )}

      </Grid>
    </Grid>

    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  </div>

  )
}

export default Breed