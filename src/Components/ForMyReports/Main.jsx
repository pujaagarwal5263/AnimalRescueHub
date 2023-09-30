import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box,Button,CircularProgress, Zoom, Modal } from "@mui/material";
import bgImg from '../../assets/secondSection.jpg';
import { Link } from "react-router-dom";
import {IoIosCloseCircleOutline} from 'react-icons/io';


const Main = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(null); 
  const [selectedReport, setSelectedReport] = useState(null);
  const [imageUpload, setImageUpload] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);

  // State to manage edited values
  const [editedLocationURL, setEditedLocationURL] = useState("");
  const [editedLandmark, setEditedLandmark] = useState("");
  const [editedAnimalName, setEditedAnimalName] = useState("");
  const [editedBreed, setEditedBreed] = useState("");
  const [editedCondtion, setEditedCondtion] = useState("");
  const [checked, setChecked] = useState(true);

  const handleOpen = (index, report) => {
    setSelectedFeatureIndex(index); 
    setSelectedReport(report);

    // Initialize the edited values with the current report data
    setEditedLocationURL(report.locationURL);
    setEditedLandmark(report.landmark);
    setEditedAnimalName(report.animalName);
    setEditedBreed(report.breed);
    setEditedCondtion(report.condition);
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFeatureIndex(null); 
  };


  const fetchReports = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.get(
        "https://animal-rescue-hub.onrender.com/get-my-reports",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setReports(response.data);
      } else {
        setError("Failed to fetch reports");
      }
    } catch (error) {
      setError("Error fetching reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

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


  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the selectedReport with edited values
      const userData = {
        locationURL: editedLocationURL,
        landmark: editedLandmark,
        animalName: editedAnimalName,
        breed: editedBreed,
        condition: editedCondtion,
        reportId: selectedReport._id,
        newURLs: imageUrls
      }
     console.log("object",userData);
      // Send a PUT request to update the report data on the server
      const authToken = localStorage.getItem("token");
      const response = await axios.post(
        `https://animal-rescue-hub.onrender.com/update-my-report`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      // Close the modal and refresh the reports data
      handleClose();
      fetchReports();
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  const confirmDelete = (reportId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this report?");
    
    if (shouldDelete) {
      // Call your delete API here
      deleteReport(reportId);
    }
  }
  
  const deleteReport = async (reportId) => {
    try {
      // Update the selectedReport with edited values
      const userData = {
        reportId: reportId
      }
      console.log(userData);
      const authToken = localStorage.getItem("token");
      const response = await axios.post(
        `https://animal-rescue-hub.onrender.com/delete-report`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
        console.log(response?.data?.message);
     
      fetchReports();
    } catch (error) {
      console.error("Error updating report:", error);
    }
  }

  return (
    <Box sx={{
      minHeight:"100vh", 
      width:"100%",
      background:`url(${bgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'bottom',
      flexDirection: "column",
      backgroundAttachment:"fixed"
    }}>
      <Box className={`myReports-main ${!isDesktop ? 'mobile' : 'desktop'}`} sx={{
        paddingTop:"80px",
        flexDirection:"column"
      }}>
        {loading ? (
          <Box sx={{height:"33vh", width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}><CircularProgress /></Box>
        ) : error ? <p style={{color:"#fff", fontSize:"20px", marginTop:"40px", textAlign:"center"}}>{error}</p> : (
          <Box sx={{padding:"0 30px"}}>
            
            <h1 style={{color:"#fff", textAlign:"center"}}>My Reports</h1>  

            {!reports?.length && <Zoom in={checked}><div className="none-found" style={{color:"#fff"}}><p style={{margin:"40px 0", textAlign:"center"}}>No reports added by you.</p><Link to="/report"><Button variant="contained" sx={{backgroundColor:"#0A87BA"}}>Click here to report an Injured Animal</Button></Link></div></Zoom>}

            {reports?.length && reports?.map((report, index) => (

              <Zoom key={index} in={checked}>
                <Box key={report._id} sx={{
                width:"100%",
                height:"180px",
                backgroundColor:"rgba(255,255,255,0.4)",
                borderRadius:"10px",
                padding:"14px 20px",
                margin:"25px 0",
                boxShadow:"10px 20px 30px rgba(0,0,0,0.2)"
              }}>
                <h2 style={{color:"white"}}>For {report.animalName}</h2>
                <Box className="animal-info-bar">
                  <p style={{fontSize:"18px", color:"#fff",margin:"5px 0"}}><b>Breed:</b> {report.breed}</p>
                  <p style={{fontSize:"18px", color:"#fff",margin:"5px 0"}}><b>Condition:</b> {report.condition}</p>
                  <p style={{fontSize:"18px", color:"#fff",margin:"5px 0"}}><b>Status:</b> {report.status}</p>
                </Box>

                <Box className="info-btns" sx={{marginTop:"10px", display:"flex", justifyContent:"space-evenly", alignItems:"center"}}>
                  <Link to={`/check-report/${report._id}`}><Button variant="contained" sx={{backgroundColor:"#0A87BA"}}>Check</Button></Link>
                  <Button variant="contained" sx={{backgroundColor:"#0A87BA"}} onClick={() => handleOpen(index,report)}>Edit</Button>
                  <Button variant="contained" onClick={() => confirmDelete(report._id)} sx={{backgroundColor:"#0A87BA"}}>Delete</Button>
                </Box>
                <Modal 
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ p: "20px", overflow:"auto" }}
              >
                <Box sx={{margin:"20px",backgroundColor:"rgba(255,255,255,0.3)", borderRadius:"10px"}}>
                  <Box sx={{padding:"20px", color:"#fff"}}>
                    <IoIosCloseCircleOutline style={{fontSize:"50px"}} onClick={handleClose}/>
                    <h1 style={{textAlign:"center", textDecoration:"underline"}}>Edit Report:</h1>
                  </Box>

                  <form onSubmit={handleFormSubmit} style={{padding:"0 40px"}}>
                  <div className='animal-form-div'>
                    <label style={{fontSize:"20px", margin:"30px 0 0"}} htmlFor="locationURL">Location URL:</label>
                    <input  
                      type="url"
                      id="locationURL"
                      name="locationURL"
                      value={editedLocationURL}
                      onChange={(e) => setEditedLocationURL(e.target.value)}
                      // value={formData.locationURL}
                      // onChange={handleChange}
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
                    <label style={{fontSize:"20px", margin:"30px 0 0"}} htmlFor="landmark">Landmark:</label>
                    <input
                      type="text"
                      id="landmark"
                      name="landmark"
                      value={editedLandmark}
                      onChange={(e) => setEditedLandmark(e.target.value)}
                      // value={formData.landmark}
                      // onChange={handleChange}
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
                      value={editedAnimalName}
                      onChange={(e) => setEditedAnimalName(e.target.value)}
                      // value={formData.animalName}
                      // onChange={handleChange}
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
                      value={editedBreed}
                          onChange={(e) => setEditedBreed(e.target.value)}
                      // value={formData.breed}
                      // onChange={handleChange}
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
                    <label style={{fontSize:"20px", margin:"30px 0 0"}} htmlFor="condition">Condition:</label>
                    <div style={{display:"flex", alignItems:"center", justifyItems:"center"}}>
                      <select
                        id="condition"
                        name="condition"
                        value={editedCondtion}
                        onChange={(e) => setEditedCondtion(e.target.value)}
                        // value={formData.condition}
                        // onChange={handleConditionChange}
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
                  <Button variant='contained' style={{backgroundColor:"#0A87BA",width:"100%", margin:"20px 0", padding:"10px 0", borderRadius:"10px", fontSize:"20px", fontWeight:"500"}} disabled={loading ? true : false} type="submit">Submit</Button>
                  {/* disabled={loading ? true : false} */}
                  {/* {loading ? <CircularProgress /> : 'Submit'} */}
                </form>

                </Box>
              

              </Modal>

              </Box>
              </Zoom>

              

            ))}          

          </Box>
        )}


      </Box>


    </Box>
  );
};

export default Main;
