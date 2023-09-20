import React, { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [imageUpload, setImageUpload] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  // State to manage edited values
  const [editedLocationURL, setEditedLocationURL] = useState("");
  const [editedLandmark, setEditedLandmark] = useState("");
  const [editedAnimalName, setEditedAnimalName] = useState("");
  const [editedBreed, setEditedBreed] = useState("");
  const [editedCondtion, setEditedCondtion] = useState("");

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
    <div style={{ backgroundColor: "red" }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h2>My Reports</h2>
          <ul>
            {reports.map((report) => (
              <li key={report._id}>
                <p>Location URL: {report.locationURL}</p>
                <p>Landmark: {report.landmark}</p>
                <p>Animal: {report.animalName}</p>
                <p>Breed: {report.breed}</p>
                <p>Condition: {report.condition}</p>
                <p>Status: {report.status}</p>
                <button onClick={() => handleEditClick(report)}>Edit</button>
                <button onClick={() => confirmDelete(report._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showModal && selectedReport && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <form onSubmit={handleFormSubmit}>
              <p>Edit Report:</p>
              <label>
                Location URL:
                <input
                  type="text"
                  value={editedLocationURL}
                  onChange={(e) => setEditedLocationURL(e.target.value)}
                />
              </label>
              <label>
                Landmark:
                <input
                  type="text"
                  value={editedLandmark}
                  onChange={(e) => setEditedLandmark(e.target.value)}
                />
              </label>
              <label>
                Animal name:
                <input
                  type="text"
                  value={editedAnimalName}
                  onChange={(e) => setEditedAnimalName(e.target.value)}
                />
              </label>
              <label>
                Breed
                <input
                  type="text"
                  value={editedBreed}
                  onChange={(e) => setEditedBreed(e.target.value)}
                />
              </label>
              <label>
                Condition
                <select
                  value={editedCondtion}
                  onChange={(e) => setEditedCondtion(e.target.value)}
                >
                  <option value="severe">Severe</option>
                  <option value="unstable">Unstable</option>
                  <option value="stable">Stable</option>
                  <option value="normal">Normal</option>
                  <option value="minor-issues">Minor Issues</option>
                </select>
              </label>
             
          <label htmlFor="imageUrls">Add more Images:</label>
          <input
            type="file"
            id="imageUrls"
            name="imageUrls"
            multiple
            onChange={handleImageUpload}
          />
        <p>{imageUpload? "Uploading": "Upload images here"}</p>
     
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
