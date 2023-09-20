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
     },4000)
    }
  }
  console.log(imageUrls);
};

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, including formData and imageUrls
    // Send this data to your backend API or perform other actions as needed
    console.log('Form data:', formData);
    console.log('Image URLs:', imageUrls);
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
      
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Main;
