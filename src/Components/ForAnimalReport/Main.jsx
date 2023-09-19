import React, { useState } from 'react';
//import cloudinary from 'cloudinary';

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

  const cloudinaryConfig = {
    cloud_name: process.env.REACT_APP_CLOUDNAME,
    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  };
  
  cloudinary.config(cloudinaryConfig);

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
  
    try {
      const uploadedImageUrls = await Promise.all(
        files.map(async (file) => {
          // Upload the image to Cloudinary
          const result = await cloudinary.uploader.upload(file, {
            upload_preset: process.env.REACT_APP_UPLOAD_PRESET,
          });
  
          return result.secure_url; // URL of the uploaded image
        })
      );
  
      // Update state with the uploaded image URLs
      setImageUrls([...imageUrls, ...uploadedImageUrls]);
      setSelectedImages([...selectedImages, ...files]);
    } catch (error) {
      // Handle upload error
      console.error('Image upload failed:', error);
    }
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
      <form onSubmit={handleSubmit}>
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
