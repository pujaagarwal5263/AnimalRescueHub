import React, { useState } from 'react';
// import cloudinary from 'cloudinary';
import { Image } from "cloudinary-react";
import axios from 'axios';

function Main() {
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
     setTimeout(()=>{
      setImageUrls(imageArray)
     },4000)
    }
  }
  setImageUpload(false)
  console.log(imageUrls);
};

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

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      const requestBody = {
        locationURL: formData.locationURL,
        landmark: formData.landmark,
        animalName: formData.animalName,
        breed: formData.breed,
        condition: formData.condition,
        imageUrls: imageUrls
      }
      const authToken = localStorage.getItem("token")
      console.log(authToken);
      const response = await axios.post('http://localhost:8000/report-animal', requestBody, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Handle success, e.g., show a success message to the user
        console.log(response.data.messageggfgfqwbed7egqw8d);
        console.log('Report added successfully');
      } else {
        // Handle any errors from the server
        console.error('Failed to add report');
      }
    }catch(err){
      console.log(err);
    }finally{
      setFormData({
        locationURL: '',
        landmark: '',
        animalName: '',
        breed: '',
        condition: 'normal', 
      });
      setImageUrls([]);
    }
  };

  return (
    <div className='blacktext'>
      <form onSubmit={handleSubmit} >
        <div >
          <label htmlFor="locationURL">Location URL:</label>
          <input
            type="text"
            id="locationURL"
            name="locationURL"
            value={formData.locationURL}
            onChange={handleChange}
          />
          At the location?
          <button onClick={fetchLocation} disabled={loadingURL}>
      {loadingURL ? "Fetching" : "Fetch Current Location"}
    </button>       
     </div>
        <div>
          <label htmlFor="landmark">Landmark:</label>
          <input
            type="text"
            id="landmark"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="animalName">Animal Name:</label>
          <input
            type="text"
            id="animalName"
            name="animalName"
            value={formData.animalName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="breed">Breed:</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
          />
          Not sure of breed?
          <button>Recognize breed</button>
        </div>
        <div>
          <label htmlFor="condition">Condition:</label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleConditionChange}
          >
            <option value="severe">Severe</option>
            <option value="unstable">Unstable</option>
            <option value="stable">Stable</option>
            <option value="normal">Normal</option>
            <option value="minor-issues">Minor Issues</option>
          </select>
        </div>
        <div>
          <label htmlFor="imageUrls">Upload Images:</label>
          <input
            type="file"
            id="imageUrls"
            name="imageUrls"
            multiple
            onChange={handleImageUpload}
          />
        <p>{imageUpload? "Uploading": "Upload images here"}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Main;
