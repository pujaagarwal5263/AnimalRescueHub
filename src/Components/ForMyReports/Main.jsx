import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box,Button,CircularProgress, Zoom } from "@mui/material";
import bgImg from '../../assets/secondSection.jpg';
import { Link } from "react-router-dom";


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


  const fetchReports = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8000/get-my-reports",
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

  const handleEditClick = (report) => {
    setSelectedReport(report);

    // Initialize the edited values with the current report data
    setEditedLocationURL(report.locationURL);
    setEditedLandmark(report.landmark);
    setEditedAnimalName(report.animalName);
    setEditedBreed(report.breed);
    setEditedCondtion(report.condition);

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReport(null);
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
        `http://localhost:8000/update-my-report`,
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
      handleCloseModal();
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
        `http://localhost:8000/delete-report`,
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
    // <div style={{ backgroundColor: "red" }}>
    //   {loading ? (
    //     <p>Loading...</p>
    //   ) : error ? (
    //     <p>{error}</p>
    //   ) : (
    //     <div>
    //       <h2>My Reports</h2>
    //       <ul>
    //         {reports.map((report) => (
    //           <li key={report._id}>
    //             <p>Location URL: {report.locationURL}</p>
    //             <p>Landmark: {report.landmark}</p>
    //             <p>Animal: {report.animalName}</p>
    //             <p>Breed: {report.breed}</p>
    //             <p>Condition: {report.condition}</p>
    //             <p>Status: {report.status}</p>
    //             <button onClick={() => handleEditClick(report)}>Edit</button>
    //             <button onClick={() => confirmDelete(report._id)}>Delete</button>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   )}
    //   {showModal && selectedReport && (
    //     <div className="modal">
    //       <div className="modal-content">
    //         <span className="close" onClick={handleCloseModal}>
    //           &times;
    //         </span>
    //         <form onSubmit={handleFormSubmit}>
    //           <p>Edit Report:</p>
    //           <label>
    //             Location URL:
    //             <input
    //               type="text"
    //               value={editedLocationURL}
    //               onChange={(e) => setEditedLocationURL(e.target.value)}
    //             />
    //           </label>
    //           <label>
    //             Landmark:
    //             <input
    //               type="text"
    //               value={editedLandmark}
    //               onChange={(e) => setEditedLandmark(e.target.value)}
    //             />
    //           </label>
    //           <label>
    //             Animal name:
    //             <input
    //               type="text"
    //               value={editedAnimalName}
    //               onChange={(e) => setEditedAnimalName(e.target.value)}
    //             />
    //           </label>
    //           <label>
    //             Breed
    //             <input
    //               type="text"
    //               value={editedBreed}
    //               onChange={(e) => setEditedBreed(e.target.value)}
    //             />
    //           </label>
    //           <label>
    //             Condition
    //             <select
    //               value={editedCondtion}
    //               onChange={(e) => setEditedCondtion(e.target.value)}
    //             >
    //               <option value="severe">Severe</option>
    //               <option value="unstable">Unstable</option>
    //               <option value="stable">Stable</option>
    //               <option value="normal">Normal</option>
    //               <option value="minor-issues">Minor Issues</option>
    //             </select>
    //           </label>
             
    //       <label htmlFor="imageUrls">Add more Images:</label>
    //       <input
    //         type="file"
    //         id="imageUrls"
    //         name="imageUrls"
    //         multiple
    //         onChange={handleImageUpload}
    //       />
    //     <p>{imageUpload? "Uploading": "Upload images here"}</p>
     
    //           <button type="submit">Save</button>
    //         </form>
    //       </div>
    //     </div>
    //   )}
    // </div>
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
                  {/* <Button variant="contained" sx={{backgroundColor:"#0A87BA"}}>Edit</Button> */}
                  <Button variant="contained" onClick={() => confirmDelete(report._id)} sx={{backgroundColor:"#0A87BA"}}>Delete</Button>
                </Box>

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
