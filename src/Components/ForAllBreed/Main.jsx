import React from 'react';
import { useState, useEffect, useRef } from 'react';
import * as tf from "@tensorflow/tfjs";
import { DropzoneArea } from "material-ui-dropzone";
import { Backdrop, Chip, CircularProgress, Grid, Stack } from "@mui/material";
import Camera from './Camera';
import { useNavigate } from 'react-router-dom';
import { Box,Button,Zoom } from '@mui/material';
import bgImg from '../../assets/secondSection.jpg';


const Main = () => {
  const navigate = useNavigate();
    const [model, setModel] = useState(null);
    const [classLabels, setClassLabels] = useState(null);
    const [loading, setLoading] = useState(false);
    const [confidence, setConfidence] = useState(null);
    const [predictedClass, setPredictedClass] = useState(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const [checked, setChecked] = useState(true);
  
    const [data, setData] = useState("");


    const imagePredictFromClick = async (data) =>{
      
     // console.log("object...",data);
     const image = await createHTMLImageElement(data);
 
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
    //console.log(predictedClass);
 
    setPredictedClass(predictedClass);
    setConfidence(confidence);
    setLoading(false);
   }

    const addimage = (url) => {
     // console.log(url);
      setData(url)
     
      imagePredictFromClick(url);

    };
  
    const goBackToForm = () =>{
      navigate("/report",{
        replace: true,
        state: {predictedClass}
      })
    }
   
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
    }, []);
  
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
       // console.log("imageSrc",imageSrc);
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
      <Box className={`recognise-breed ${!isDesktop ? 'mobile' : 'desktop'}`} sx={{
      minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        background: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundAttachment:"fixed",
        flexDirection: "column"
    }}>
    <Zoom in={checked}>
    <Grid container className="App" direction="column" alignItems="center" justifyContent="center" sx={{padding:"80px 0"}}>
      <Grid item>
        <h1 style={{ textAlign: "center", marginBottom: "1.5em", color:"#fff" }}>Get Your Animal Breed</h1>
        <DropzoneArea
          acceptedFiles={["image/*"]}
          dropzoneText={"Add an image"}
          onChange={handleImageChange}
          maxFileSize={10000000}
          filesLimit={1}
          showAlerts={["error"]}
        />
        <Stack sx={{ margin: "2em 4rem", width: "12rem" }} direction="row" spacing={1}>
          <Chip
            label={predictedClass === null ? "Prediction:" : `Prediction: ${predictedClass}`}
            style={{ justifyContent: "left",color:"#fff",fontSize:"20px", padding:"5px " }}
            variant="outlined"
          />
          <Chip
            label={confidence === null ? "Confidence:" : `Confidence: ${confidence}%`}
            style={{ justifyContent: "left", color:"#fff", fontSize:"20px", padding:"5px " }}
            variant="outlined"
          />
        </Stack>

        <Camera onAdd={addimage}/>

      </Grid>
    </Grid>
    </Zoom>

    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
    <Zoom in={checked}><Button onClick={goBackToForm} variant='contained' style={{width:"50%", margin:"0 auto"}}>Done</Button></Zoom>
  </Box>

  )
}

export default Main