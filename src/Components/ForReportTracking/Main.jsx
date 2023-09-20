import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [reportId, setReportId] = useState('');
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const authToken = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/track/${reportId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        setReportData(response.data);
      } else {
        setError('Failed to fetch report');
      }
      console.log(response.data);
    } catch (error) {
      setError('Error fetching report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Track Report</h2>
      <label>
        Enter Report ID:
        <input
          type="text"
          value={reportId}
          onChange={(e) => setReportId(e.target.value)}
        />
      </label>
      <button onClick={handleSearchClick}>Search</button>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : reportData ? (
        <div>
          <h3>Report Details</h3>
          <p>Location URL: {reportData.locationURL}</p>
          <p>Landmark: {reportData.landmark}</p>
          <p>Animal: {reportData.animalName}</p>
          {/* Add more report fields as needed */}
        </div>
      ) : (
        <p>Enter a valid Report ID and click Search to retrieve data.</p>
      )}
    </div>
  );
};

export default Main;
