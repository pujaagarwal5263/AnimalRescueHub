import React, { useState, useEffect } from 'react';
// import cloudinary from 'cloudinary';
import { Image } from "cloudinary-react";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import bgImg from '../../assets/secondSection.jpg';
import { Box, Button,Zoom,CircularProgress } from '@mui/material';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    locationURL: '',
    landmark: '',
    animalName: '',
    breed: '',
    condition: 'normal', // Default value
  });

  const [imageUrls, setImageUrls] = useState([]);
  const [loadingURL, setLoadingURL]=useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);


// Add your Cloudinary configuration here
const cloudinaryConfig = {
  cloudName: "dndorgct9",
  apiKey: "967523612336929",
  apiSecret: "UFUbj4CcHCbBniV8VrDYv6-Q1sI",
};

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConditionChange = (event) => {
    setFormData({
      ...formData,
      condition: event.target.value,
    });
  };

  const handleImageUpload = async (event) => {
    setImageUpload(true)
    setLoading(true)
    const files = Array.from(event.target.files);
    const imageArray = [];
  if (files.length > 0) {
   // setIsUploading(true);
    const formData = new FormData();
    formData.append("upload_preset", `ry2mqe7j`);
    // Append each file to the FormData object
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dndorgct9/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const imageUrlsfromCloud = data.secure_url;
      imageArray.push(imageUrlsfromCloud)
      console.log(imageArray);
     setTimeout(()=>{
      setImageUrls(imageArray)
     },1000)
    }
  }
  setLoading(false)
  setImageUpload(false)
  console.log(imageUrls);
};

const goToModel = () =>{
  navigate("/breed")
}

const fetchLocation = async() => {
  setLoadingURL(true);
  console.log("loadingURL", loadingURL);

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        formData.locationURL=mapsUrl;
        // Update the state with the URL and set loading to false
        setLoadingURL(false);
        toast.success("Location fetched ...")

        // Rest of your code...
      },
      (error) => {
        // Handle the error and set loading to false
        setLoadingURL(false);
        alert(`Error: ${error.message}`);
      }
    );
  } else {
    // Handle the error and set loading to false
    setLoadingURL(false);
    alert('Geolocation is not available in your browser');
  }
};

useEffect(()=>{
  if(location?.state?.predictedClass){
    setFormData({
      ...formData,
      breed: location.state.predictedClass,
    });
  }
},[]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (
      !formData.locationURL ||
      !formData.landmark ||
      !formData.animalName ||
      !formData.breed 
    ) {
      toast.error("Please fill in all the required fields.");
      return; // Stop the submission if any required field is missing
    }
  
    try {
      setLoading(true)
      const requestBody = {
        locationURL: formData.locationURL,
        landmark: formData.landmark,
        animalName: formData.animalName,
        breed: formData.breed,
        condition: formData.condition,
        imageUrls: imageUrls,
      };
  
      const authToken = localStorage.getItem("token");
  
      const response = await axios.post(
        'https://animal-rescue-hub.onrender.com/report-animal',
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        console.log(response.data.message);
        console.log('Report added successfully');
        setLoading(false)
        toast.success("Report Submitted!!");
      } else {
        setLoading(false)
        toast.error("Failed to add Report.");
        console.error('Failed to add report');
      }
    } catch (err) {
      console.log(err);
      setLoading(false)
      toast.error("An error occurred!");
    } finally {
      setFormData({
        locationURL: '',
        landmark: '',
        animalName: '',
        breed: '',
        condition: 'normal',
      });
      setImageUrls([]);
      setLoading(false)
    }
  };

  return (
    <Box className={`animal-form ${!isDesktop ? "mobile" : "desktop"}`} sx={{minHeight:"100vh", width:"100%"}}>
      <Box className="form-content" sx={{background:`url(${bgImg})`, backgroundSize: 'cover',
        backgroundPosition: 'bottom', backgroundAttachment:"fixed",
        flexDirection: "column", width:"100%", paddingTop:"80px"}}>
        <h1 style={{color:"#fff", textAlign:"center", textDecoration:"underline"}}>Animal Report Form</h1>
        <Zoom in={checked}>
        <form onSubmit={handleSubmit} style={{padding:"0 40px"}}>
          <div className='animal-form-div'>
            <label style={{fontSize:"20px", margin:"30px 0 0"}} htmlFor="locationURL">Location URL:</label>
            <input  
              type="url"
              id="locationURL"
              name="locationURL"
              value={formData.locationURL}
              onChange={handleChange}
              style={{
                width:"100%",
                height:"30px",
                padding:"0 10px",
                backgroundColor:"transparent",
                border:"2px solid #fff",
                color:"#fff",
                margin:"5px 0",
              }}
            />
            <div className="another-location-input" style={{textAlign:"center", margin:"20px"}}>
              <span style={{color:"#fff", fontWeight:"600"}}>At the location?</span>
              <button onClick={fetchLocation} style={{marginLeft:"8px", backgroundColor:"#fff", border:"none", padding:"6px 10px", fontWeight:"500", borderRadius:"40px"}} disabled={loadingURL}>{loadingURL ? "Fetching" : "Fetch Current Location"}
              </button> 
            </div>      
          </div>
          <div>
            <label style={{fontSize:"20px", margin:"30px 0 0"}} htmlFor="landmark">Landmark:</label>
            <input
              type="text"
              id="landmark"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              style={{
                width:"100%",
                height:"30px",
                padding:"0 10px",
                backgroundColor:"transparent",
                border:"2px solid #fff",
                color:"#fff",
                margin:"5px 0",
              }}
            />
          </div>
          <div>
            <label style={{fontSize:"20px", margin:"30px 0 0"}} htmlFor="animalName">Animal Type:</label>
            <input
              type="text"
              id="animalName"
              name="animalName"
              value={formData.animalName}
              onChange={handleChange}
              style={{
                width:"100%",
                height:"30px",
                padding:"0 10px",
                backgroundColor:"transparent",
                border:"2px solid #fff",
                color:"#fff",
                margin:"5px 0"
              }}
              placeholder='Dog/Cat etc'
            />
          </div>
          <div>
            <label style={{fontSize:"20px", margin:"30px 0 0"}} htmlFor="breed">Breed:</label>
            <input
              type="text"
              id="breed"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              style={{
                width:"100%",
                height:"30px",
                padding:"0 10px",
                backgroundColor:"transparent",
                border:"2px solid #fff",
                color:"#fff",
                margin:"5px 0",
              }}
            />
            <div className="detect-breed-link" style={{textAlign:"center", margin:"20px"}}>
              <span style={{color:"#fff", fontWeight:"600"}}>Not sure of breed?</span>
              <button style={{marginLeft:"8px", backgroundColor:"#fff", border:"none", padding:"6px 10px", fontWeight:"500", borderRadius:"40px"}} onClick={goToModel}>Recognize breed</button>
            </div>
          </div>
          <div>
            <label style={{fontSize:"20px", margin:"30px 0 0"}} htmlFor="condition">Condition:</label>
            <div style={{display:"flex", alignItems:"center", justifyItems:"center"}}>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleConditionChange}
                style={{width:"200px", padding:"8px", border:"none", borderRadius:"5px", margin:"8px auto 0"}}
              >
                <option value="severe">Severe</option>
                <option value="unstable">Unstable</option>
                <option value="stable">Stable</option>
                <option value="normal">Normal</option>
                <option value="minor-issues">Minor Issues</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{fontSize:"20px", margin:"30px 0 0"}} htmlFor="imageUrls">Upload Images:</label>
            <input
              type="file"
              id="imageUrls"
              name="imageUrls"
              multiple
              onChange={handleImageUpload}
              style={{
                width:"100%",
                height:"30px",
                backgroundColor:"transparent",
                border:"2px solid #fff",
                color:"#fff",
                margin:"15px 0",
              }}
            />
          <p style={{textAlign:"center", color:"#fff", fontWeight:"600" }}>{imageUpload? "Uploading": "Upload images here"}</p>
          </div>
          <Button variant='contained' style={{backgroundColor:"#0A87BA",width:"100%", margin:"20px 0", padding:"10px 0", borderRadius:"10px", fontSize:"20px", fontWeight:"500"}} disabled={loading ? true : false} type="submit">{loading ? <CircularProgress /> : 'Submit'}</Button>
        </form>
        </Zoom>
      </Box>
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
    </Box>
  );
}

export default Main;
