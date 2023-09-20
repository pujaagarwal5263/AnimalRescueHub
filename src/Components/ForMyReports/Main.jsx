import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // State to manage edited values
  const [editedLocationURL, setEditedLocationURL] = useState('');
  const [editedLandmark, setEditedLandmark] = useState('');
  const [editedAnimalName, setEditedAnimalName] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const authToken = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/get-my-reports', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status === 200) {
          setReports(response.data);
        } else {
          setError('Failed to fetch reports');
        }
      } catch (error) {
        setError('Error fetching reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleEditClick = (report) => {
    setSelectedReport(report);

    // Initialize the edited values with the current report data
    setEditedLocationURL(report.locationURL);
    setEditedLandmark(report.landmark);
    setEditedAnimalName(report.animalName);

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
      selectedReport.locationURL = editedLocationURL;
      selectedReport.landmark = editedLandmark;
      selectedReport.animalName = editedAnimalName;

      // Send a PUT request to update the report data on the server
      const authToken = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/update-report/${selectedReport.id}`, selectedReport, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      // Close the modal and refresh the reports data
      handleCloseModal();
      fetchReports();
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  return (
    <div style={{ backgroundColor: 'red' }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h2>My Reports</h2>
          <ul>
            {reports.map((report) => (
              <li key={report.id}>
                <p>Location URL: {report.locationURL}</p>
                <p>Landmark: {report.landmark}</p>
                <p>Animal: {report.animalName}</p>
                <button onClick={() => handleEditClick(report)}>Edit</button>
                <button onClick={() => handleDeleteClick(report.id)}>Delete</button>
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
                Animal:
                <input
                  type="text"
                  value={editedAnimalName}
                  onChange={(e) => setEditedAnimalName(e.target.value)}
                />
              </label>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
